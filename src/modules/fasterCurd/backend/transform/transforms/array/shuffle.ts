import { createTransform } from '..'
import { TransformFunction } from '../..'

function shuffle<T>(): TransformFunction<T[], T[]> {
  return createTransform(
    (array: T[]) => {
      const shuffled = [...array]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    },
    { name: shuffle.name }
  )
}

export default shuffle
