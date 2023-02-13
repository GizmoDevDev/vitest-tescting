import {describe, expect, it} from "vitest";
import {getAddress} from "./getAddress";

describe.concurrent('basic test', () => {
  it('creating address', () => {
    const stringAddress = 'Moscow, Lermontov str., 32, 33'
    const expectedAddress = {
      city: 'Moscow',
      street: 'Lermontov str.',
      homeNumber: 32,
      plateNumber: 33,
    }
    expect(getAddress(stringAddress)).toEqual(expectedAddress);
  })

  it('Part address', () => {
    const stringAddress = 'Moscow, Lermontov str., 32, 33'
    const expectedAddress = {
      city: 'Moscow',
      street: 'Lermontov str.',
    }
    expect(getAddress(stringAddress)).toMatchObject(expectedAddress);
  })
})