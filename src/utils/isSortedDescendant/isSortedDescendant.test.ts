import {describe, it, expect, expectTypeOf} from "vitest";
import {isSortedDescendant} from "./isSortedDescendant";

describe.concurrent('isSortedDescendant tests', () => {
  it('expect true', () => {
    const array = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    const res = isSortedDescendant(array);
    expect(res).toBeTruthy();
    expectTypeOf(res).toEqualTypeOf<boolean>()
  })

  it('expect false', () => {
    const array = [10, 90, 8, 7, 6, 5, 4, 3, 2, 1];
    const res = isSortedDescendant(array);
    expect(res).toBeFalsy();
    expectTypeOf(res).toEqualTypeOf<boolean>()
  })

  it('empty array', () => {
    const array: number[] = [];
    const res = isSortedDescendant(array);
    expect(res).toBeTruthy();
    expectTypeOf(res).toEqualTypeOf<boolean>()
  })

  it('same number', () => {
    const array: number[] = [1, 1, 1, 1, 1, 1, 1,];
    const res = isSortedDescendant(array);
    expect(res).toBeTruthy();
    expectTypeOf(res).toEqualTypeOf<boolean>()
  })
})