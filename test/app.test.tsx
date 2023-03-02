import {afterEach, beforeEach, describe, expect, Mock, test, vi} from "vitest";
import {render, screen} from '@testing-library/react';
import App from "../src/App";
import { mockLoaderTestId } from './mock/Loader';
import {setImmediate} from 'timers'
import userEvent from "@testing-library/user-event";

vi.mock('../src/ui-kit/Loader/Loader',  () => ({
  Loader: () => <div data-testId={mockLoaderTestId} />
}) )

describe('тестирование экрана с конвертацией валют', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  })
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('Loading before fetch execute', () => {
    (fetch as Mock).mockResolvedValue({json: () => Promise.resolve([54])})
    render(<App />)
    const loader = screen.getByTestId(mockLoaderTestId);
    expect(loader).not.toBe(null)
  })

  test('Loading doesnt exist after fetch execute', async () => {
    (fetch as Mock).mockResolvedValue({json: () => Promise.resolve([54])})
    render(<App />)
    await new Promise(setImmediate)
    expect(() => screen.getByTestId(mockLoaderTestId)).toThrow();
  })

  test('Change rub input', async () => {
    (fetch as Mock).mockResolvedValue({json: () => Promise.resolve([54])})
    const { container, rerender } = render(<App />)
    await new Promise(setImmediate)
    rerender(<App />)
    const input = container.querySelector('input');
    if (!input) {
      test.fails('Doesnt exist input')
      return
    }
    await userEvent.type(input, '54')
    expect(container).toMatchSnapshot()
  })

  test('Change usd input', async () => {
    (fetch as Mock).mockResolvedValue({json: () => Promise.resolve([54])})
    const { container, rerender } = render(<App />)
    await new Promise(setImmediate)
    rerender(<App />)
    const input = container.querySelectorAll('input')[1];
    if (!input) {
      test.fails('Doesnt exist input')
      return
    }
    await userEvent.type(input, '54')
    expect(container).toMatchSnapshot()
  })
})