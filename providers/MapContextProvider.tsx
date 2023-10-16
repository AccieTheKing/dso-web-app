import Leaflet from 'leaflet'
import { ReactNode, createContext, useContext, useState } from 'react'

interface MapContextValues {
  map: Leaflet.Map | undefined
  setMap: (e: Leaflet.Map | undefined) => void
}

export const MapContext = createContext<MapContextValues | undefined>(undefined)

interface MapContextProviderProps {
  children: ReactNode
}

const MapContextProvider = ({ children }: MapContextProviderProps) => {
  const [map, setMap] = useState<Leaflet.Map | undefined>(undefined)

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  )
}

export const useMapContext = () => {
  const context = useContext(MapContext)
  if (context === undefined) {
    throw new Error('useMapContext must be used within a MapContextProvider')
  }
  return context
}

export default MapContextProvider
