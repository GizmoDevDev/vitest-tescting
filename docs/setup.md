# Установка и базовая настройка
`yarn add -D vitest`
Для установки требуется `vite`
## Настройка
Есть два способа настройки vitest:
- через vite.config.ts
- через vitest.config.ts

_В данном проекте мы рассмотрим только второй способ_
### vitest.config.ts
Создаем файл `vitest.config.ts` со следующим содержимым
```typescript
import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
  },
}))
```

## Запуск
- Для запуска тестов используется команда `yarn vitest`
- Для запуска проверки покрытия используется команда `yarn vitest run --coverage`

_Для работы функции coverage необходимо дополнительно установить:
`yarn add -D @vitest/coverage-c8'`_