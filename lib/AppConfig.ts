import { LatLngExpression } from 'leaflet'

export const AppConfig = {
  minZoom: 0,
  maxZoom: 18,
  ui: {
    bigIconSize: 48,
    mapIconSize: 32,
    markerIconSize: 32
  },
  baseCenter: [52.2129919, 5.2793703] as LatLngExpression
}
