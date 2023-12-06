type ITransform = (...data: any) => any


function transform<A, T extends ITransform[]>(... transforms: T) {
  return (data: A) => {
    return transforms.reduce((acc, transform) => {
      return transform(acc)
    }, data)
  }
}


/**
 * T has 0 elements: return A
 * T has 1 element: return the return type of the transform function
 * T has more than 1 element: return the return type of the last transform function
 */
type TransformedType<A, T extends ITransform[]> = T extends [] ? A : 
T extends [infer F] ? ReturnType<F> : 

function pick<A>(... fields: (keyof A)[]) {
  return (data: A) => {
    return fields.reduce((acc, field) => {
      acc[field] = data[field]
      return acc
    }, {} as any) as Pick<A, typeof fields[number]>
  }
}

const demoObj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
}

const demoTransform = transform(
  pick('a', 'b'),
)

const transformed = demoTransform(demoObj)