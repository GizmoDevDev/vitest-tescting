/**
 * Функция проверяет, что массим отсортирован по неубыванию
 * @param array
 */
export const isSortedDescendant = (array: number[]) => {
  return array.every((item, index, a) => {
    if (index === 0) return true;
    return a[index - 1] >= item;
  })
}