import { LatLngExpression } from 'leaflet'
import { Category } from '@/lib/MarkerCategories'

interface PlaceValues {
  position: LatLngExpression
  category: Category
}

export type PlacesType = PlaceValues[]

/**
 * Location of work places
 */
export const Places: PlacesType = [
  {
    category: Category.CAT1,
    position: [52.2129919, 5.2793703]
  },
  {
    category: Category.CAT2,
    position: [52.2129919, 5.2793703]
  },
  {
    category: Category.CAT2,
    position: [52.89, 5.2793703]
  },
  {
    category: Category.CAT2,
    position: [53.239423, 5.2793703]
  },
  {
    category: Category.CAT2,
    position: [56.234362435, 5.2793703]
  }
]
