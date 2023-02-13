/**
 * Функция проверяет, что массим отсортирован по неубыванию
 * @param array - входной массив
 */
export const isSortedDescendant = (array: number[]): boolean => {
  return array.every((item, index, a) => {
    if (index === 0) return true;
    return a[index - 1] >= item;
  })
}