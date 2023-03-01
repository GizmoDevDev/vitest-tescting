# Тестирование React

Тестирование React будем проводить с помощью `React Testing Library`

## Настройка
1. `yarn add -D jsdom` устанавливаем jsdom для доступа к html в vitest
2. Добавляем в настройку vite или vitest jsdom в качестве окружения
```js
test: {
    environment: 'jsdom',
},
```
3. `yarn add -D @testing-library/react @testing-library/jest-dom` подключаем саму библиотеку `React Testing Library`
4. `yarn add -D @testing-library/user-event` добавляем библиотеку, чтобы имитировать действия пользователей
5. Создаем файл setup, чтобы не писать настройки для каждого файла отдельно со следующим содержимым:
```js
//setup.js
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
```
6. Дорабатываем настройки vitest:
```js
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'setup.js', // Нужно указать весь путь для файла setup.js
  },
```