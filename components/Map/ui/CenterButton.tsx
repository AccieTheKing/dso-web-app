import { LatLngExpression } from 'leaflet'
import { Shrink } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useMapEvents } from 'react-leaflet'

import { AppConfig } from '@/lib/AppConfig'
import { useMapContext } from '@/providers/MapContextProvider'

interface CenterButtonProps {
  center: LatLngExpression
  zoom: number
}

export const CenterButton: React.FC<{ center: CenterButtonProps['center']; zoom: CenterButtonProps['zoom'] }> = ({
  center,
  zoom
}: CenterButtonProps) => {
  const [isTouched, setIsTouched] = useState(false)
  const { map } = useMapContext()

  const touch = useCallback(() => {
    if (!isTouched && map) {
      setIsTouched(true)
    }
  }, [map])

  useMapEvents({
    move() {
      touch()
    },
    zoom() {
      touch()
    }
  })

  const handleClick = useCallback(() => {
    if (!isTouched || !map) return

    map.flyTo(center, zoom)
    map.once('moveend', () => {
      setIsTouched(false)
    })
  }, [map, isTouched, zoom, center])

  return (
    <button
      type="button"
      style={{ zIndex: 400 }}
      className={`button absolute right-3 top-2 rounded bg-white p-2 shadow-md ${
        isTouched ? 'text-dark' : 'text-light'
      } `}
      onClick={() => handleClick()}
    >
      <Shrink size={AppConfig.ui.mapIconSize} />
    </button>
  )
}
