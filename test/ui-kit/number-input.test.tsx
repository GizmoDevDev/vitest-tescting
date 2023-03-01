import {afterEach, beforeEach, describe, expect, test, vi} from "vitest";
import {render, RenderResult, screen} from '@testing-library/react';
import {NumberInput} from '../../src/ui-kit/NumberInput/NumberInput'
import userEvent from "@testing-library/user-event";

describe('Тестирование NumberInput', () => {
  describe('Тестирование базовых свойств', () => {
    const inputTestId = 'adsfewr3rfdsdsf4rt';
    const inputValue = 42;
    const onChangeInput = vi.fn();
    const onHoverInput = vi.fn();
    const onBlurInput = vi.fn();
    let input: HTMLInputElement;

    beforeEach(() => {
      render(<NumberInput
        data-testid={inputTestId}
        value={inputValue}
        onChange={onChangeInput}
        onMouseEnter={onHoverInput}
        onMouseLeave={onBlurInput}
      />)
      input = screen.getByTestId(inputTestId);
    })

    afterEach(() => {
      vi.clearAllMocks()
    })

    test('check default value', () => {
      expect(input.valueAsNumber).toBe(inputValue)
    })

    test('user change data - called onChange callback', async () => {
      await userEvent.type(input, '34')
      expect(onChangeInput).toBeCalledWith(423)
      expect(onChangeInput).toBeCalledWith(424)
    })

    test('NumberInput use html tag input', () => {
      expect(input.tagName).toBe('INPUT')
    })

    test('hover event trigger onMouseEnter event', async () => {
      await userEvent.hover(input)
      expect(onHoverInput).toBeCalled()
      expect(onBlurInput).not.toBeCalled()

      await userEvent.unhover(input)
      expect(onBlurInput).toBeCalled()
    })
  })

  describe('Тестируем, что ввод данных будет менять отображение, но будет игнорировать не цифры', () => {
    const inputTestId = 'adsfewr3rfdsdsf4rt';
    let inputValue = 42;
    let onChangeInput = vi.fn((value: number) => inputValue = value);
    let input: HTMLInputElement
    let renderOption: RenderResult

    beforeEach(() => {
      inputValue = 0;
      renderOption = render(<NumberInput
        data-testid={inputTestId}
        value={inputValue}
        onChange={onChangeInput}
      />)
      input = screen.getByTestId(inputTestId);
    })

    afterEach(() => {
      vi.clearAllMocks()
    })

    test('вводим цифры, проверяем, что инпут поменялся', async () => {
      await userEvent.type(input, '3')
      expect(onChangeInput).toBeCalledWith(3)
      renderOption.rerender(<NumberInput data-testid={inputTestId} value={inputValue} onChange={onChangeInput} />)

      expect(input.valueAsNumber).toBe(3)
    })

    test('вводим буквы, проверяем, что инпут не поменялся', async () => {
      await userEvent.type(input, 'фвыа')
      expect(onChangeInput).not.toBeCalled()
      renderOption.rerender(<NumberInput data-testid={inputTestId} value={inputValue} onChange={onChangeInput} />)

      expect(input.valueAsNumber).toBe(0)
    })
  })
})