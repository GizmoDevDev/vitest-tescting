import {describe, expect, it} from "vitest";
import { factorial } from './factorial';

type TestData = {
  input: number,
  output: number,
}

describe.each([{
    input: 0,
    output: 1,
  },
  {
    input: 1,
    output: 1,
  },{
    input: 5,
    output: 120,
  },
])('positive test', ({input, output}: TestData) => {
  it(`test ${input}! equal ${output}`, () => {
    expect(factorial(input)).toEqual(output)
  })
})

describe('negative input', () => {
  it('check throw error', () => {
    expect(() => factorial(-1)).toThrow()
  })
})