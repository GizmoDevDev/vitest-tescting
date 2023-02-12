import {describe, it, expect} from "vitest";
import {isSortedDescendant} from "./isSortedDescendant";

describe.concurrent('isSortedDescendant tests', () => {
  it('expect true', () => {
    const array = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    expect(isSortedDescendant(array)).toBeTruthy();
  })

  it('expect false', () => {
    const array = [10, 90, 8, 7, 6, 5, 4, 3, 2, 1];
    expect(isSortedDescendant(array)).toBeFalsy();
  })

  it('empty array', () => {
    const array: number[] = [];
    expect(isSortedDescendant(array)).toBeTruthy();
  })

  it('same number', () => {
    const array: number[] = [1, 1, 1, 1, 1, 1, 1,];
    expect(isSortedDescendant(array)).toBeTruthy();
  })
})