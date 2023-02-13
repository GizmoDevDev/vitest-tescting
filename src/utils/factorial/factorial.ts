export function factorial(input: number): number {
  if (input < 0) throw new Error('Negative number input')
  let result = 1;
  for (let i = 1; i <= input; i++) result *= i;
  return result;
}