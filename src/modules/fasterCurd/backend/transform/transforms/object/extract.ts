import { createTransform } from '..';
import { TransformFunction } from '../..';

function extractProperty<T, K extends keyof T>(property: K): TransformFunction<T, T[K]> {
  return createTransform((obj: T) => obj[property], { name: extractProperty.name });
}

export default extractProperty;
