import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import MapContextProvider, { useMapContext } from '@/providers/MapContextProvider'
import useLeafletWindow from '@/components/Map/hooks/useLeafletWindow'
import useMarker from '@/components/Map/hooks/useMarker'
import { Places } from '@/lib/Places'
import MarkerCategories, { Category } from '@/lib/MarkerCategories'

const LeafletCluster = dynamic(async () => (await import('./LeafletCluster')).LeafletCluster(), { ssr: false })
const CenterToMarkerButton = dynamic(async () => (await import('./ui/CenterButton')).CenterButton, { ssr: false })
const LocateButton = dynamic(async () => (await import('./ui/LocateButton')).LocateButton, { ssr: false })
const CustomMarker = dynamic(async () => (await import('./Marker')).CustomMarker, { ssr: false })
const LeafletMapContainer = dynamic(async () => (await import('./LeafletMap')).LeafletMap, { ssr: false })

const MapInner = () => {
  const { map } = useMapContext()
  const leafletWindow = useLeafletWindow()

  const {
    width: viewportWidth,
    height: viewportHeight,
    ref: viewportRef
  } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 200
  })

  const { clustersByCategory, allMarkersBoundCenter } = useMarker({
    locations: Places,
    map,
    viewportWidth,
    viewportHeight
  })

  const isLoading = !map || !leafletWindow || !viewportWidth || !viewportHeight

  /** watch position & zoom of all markers */
  useEffect(() => {
    if (!allMarkersBoundCenter || !map) return

    const moveEnd = () => {
      map.setMinZoom(allMarkersBoundCenter.minZoom - 1)
      map.off('moveend', moveEnd)
    }

    map.flyTo(allMarkersBoundCenter.centerPos, allMarkersBoundCenter.minZoom, {
      animate: false
    })
    map.once('moveend', moveEnd)
  }, [allMarkersBoundCenter])

  return (
    <div className="absolute h-full w-full overflow-hidden" ref={viewportRef}>
      <LeafletMapContainer
        center={allMarkersBoundCenter.centerPos}
        zoom={allMarkersBoundCenter.minZoom}
        // maxZoom={AppConfig.maxZoom}
        // minZoom={AppConfig.minZoom}
      >
        {!isLoading ? (
          <>
            <CenterToMarkerButton center={allMarkersBoundCenter.centerPos} zoom={allMarkersBoundCenter.minZoom} />
            <LocateButton />
            {Object.values(clustersByCategory).map(item => (
              <LeafletCluster
                key={item.category}
                icon={MarkerCategories[item.category as Category].icon}
                color={MarkerCategories[item.category as Category].color}
                chunkedLoading
              >
                {item.markers.map(marker => (
                  <CustomMarker
                    icon={MarkerCategories[marker.category].icon}
                    color={MarkerCategories[marker.category].color}
                    key={(marker.position as number[]).join('')}
                    position={marker.position}
                  />
                ))}
              </LeafletCluster>
            ))}
          </>
        ) : (
          <></>
        )}
      </LeafletMapContainer>
    </div>
  )
}

// pass through to get context in <MapInner>
const Map = () => (
  <MapContextProvider>
    <MapInner />
  </MapContextProvider>
)

export default Map
