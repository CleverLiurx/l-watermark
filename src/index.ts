// function createArray<T>(length: number, value: T): Array<T> {
//   let result: T[] = [];
//   for (let i = 0; i < length; i++) {
//       result[i] = value;
//   }
//   return result;
// }

// const a = createArray(3, 'x'); // ['x', 'x', 'x']


function fnfn<T>(value: T): T[] {
  return [value, value, value]
}

const a = fnfn('asd')