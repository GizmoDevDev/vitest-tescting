# Основы тестирования

По умолчанию файлы для тестирования должны иметь следующий вид `**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`
Изменить его можно изменив настройки в файле `vitest.config.ts` добавив поле `include` с нужным шаблоном.

Основные ключевые слова
- describe - позволяет объединить тесты по какому-либо признаку
- it - функция, описывающая один тест
- expect - функция, проверяющая ожидаемое значение с реальным

Пример использования
```typescript
//isSortedDescendant.test.ts
import { describe, it, expect } from "vitest";
import { isSortedDescendant } from "./isSortedDescendant";

describe('isSortedDescendant tests', () => {
  it('expect true', () => {
    const array = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    expect(isSortedDescendant(array)).toBeTruthy();
  })

  it('expect false', () => {
    const array = [10, 90, 8, 7, 6, 5, 4, 3, 2, 1];
    expect(isSortedDescendant(array)).toBeFalsy();
  })
})
```

## Возможности _**expect**_
После `expect(testingValue)` через точку нужно указать одну из следующих функций для сравнения
- toBeTruthy() - `testingValue` любое кроме `false`, `0`, `''`, `null`, `undefined` и `NaN`
- toBeFalsy() - `testingValue` равно одному из следующих значений`false`, `0`, `''`, `null`, `undefined` и `NaN`
- toBe(actualValue) | to.equal(actualValue) - `testingValue` равно `actualValue`
- not.toBe(actualValue) | not.to.equal(actualValue) - `testingValue` не равно `actualValue`
- toBeCloseTo(actualValue, decimal)
- toMatchObject(actualValue) - позволяет сравнивать объекты неполным вхождением
- toThrowError() - проверяет, что было выброшено исключение
- resolves() rejects() - проверяет, что промис завершился с указанным статусом
- arrayContaining(actualValue) - проверяет, что в массиве ест ьвсе перечисленные элементы

## Управление запускаемыми тестами
- `describe.only` - запускает только этот блок с тестами
- `describe.skip` - не запускает это блок с тестами
- `describe.todo` - для заглушек ненаписанных тестов
- `describe.skipIf` - пропускает тест, если условие выполняется

## Действия перед/после тестов
- `beforeEach` - выполняется перед каждым тестом
- `afterEach` - выполняется после каждого теста
- `beforeAll` - выполняется один раз перед всеми тестами
- `afterAll` - выполняется один раз после всех тестов

## Доп опции
- `describe.each` - позволяет передать набор данных, которые будут использоваться во всех тестах внутри блока