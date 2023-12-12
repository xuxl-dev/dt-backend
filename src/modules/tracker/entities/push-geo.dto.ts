import { z } from 'zod'
export class GeoData {
  longitude: number
  latitude: number

  constructor(longitude: number, latitude: number) {
    this.longitude = longitude
    this.latitude = latitude
  }
}

export const GeoDataScheme = z.object({
  longitude: z.number().default(0),
  latitude: z.number().default(0),
})
