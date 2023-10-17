import { Marker } from 'react-leaflet'
import { AppConfig } from '@/lib/AppConfig'
import LeafletDivIcon from '@/components/Map/LeafletDivIcon'
import MarkerIconWrapper, { CustomMarkerProps } from '@/components/Map/Marker/MarkerIconWrapper'
import { useMapContext } from '@/providers/MapContextProvider'

export const CustomMarker: React.FC<{
  position: CustomMarkerProps['position']
  icon: CustomMarkerProps['icon']
  color: CustomMarkerProps['color']
}> = ({ position, icon, color }: CustomMarkerProps) => {
  const { map } = useMapContext()

  const handleMarkerClick = () => map?.panTo(position)

  return (
    <Marker
      position={position}
      icon={LeafletDivIcon({
        source: <MarkerIconWrapper color={color} icon={icon} />,
        anchor: [(AppConfig.ui.markerIconSize + 16) / 2, (AppConfig.ui.markerIconSize + 16) / 2]
      })}
      eventHandlers={{ click: handleMarkerClick }}
    />
  )
}
