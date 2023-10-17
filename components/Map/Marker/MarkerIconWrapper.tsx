import { LatLngExpression } from 'leaflet'
import { LucideProps } from 'lucide-react'
import { FunctionComponent, useMemo } from 'react'
import { AppConfig } from '@/lib/AppConfig'

export interface CustomMarkerProps {
  position: LatLngExpression
  icon?: FunctionComponent<LucideProps>
  color: string
  label?: string
}

const MarkerIconWrapper = ({ icon, color, label }: Partial<CustomMarkerProps>) => {
  const IconFC = useMemo(() => icon ?? null, [icon])

  return (
    <div className="relative m-0 inline-flex p-0">
      {label && <span className="absolute -inset-2 rounded-full opacity-40" style={{ backgroundColor: color }} />}
      <div className="relative inline-block rounded-full bg-primary p-2 text-white" style={{ backgroundColor: color }}>
        {IconFC && <IconFC size={AppConfig.ui.markerIconSize} />}
        {label && (
          <span className="bg-error absolute -right-2 -top-2 flex h-7 w-7 flex-col items-center rounded-full border-2 border-white pt-1 text-xs">
            {label}
          </span>
        )}
      </div>
      <span className={`absolute ${label ? '-inset-2' : '-inset-1'} rounded-full shadow-md`} />
    </div>
  )
}

export default MarkerIconWrapper
