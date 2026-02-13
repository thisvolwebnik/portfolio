## Portfolio — Professional photographer

Адаптивный лендинг-портфолио фотографа по макету из Figma с кастомным горизонтальным слайдером работ и деплоем на GitHub Pages.

- **Продакшн-версия**: [`https://thisvolwebnik.github.io/portfolio/`](https://thisvolwebnik.github.io/portfolio/)
- **Макет в Figma**: [`Portfolio — Copy`](https://www.figma.com/design/joXXCXq34oB6GJaYdxAgtx/Portfolio--Copy-?m=auto)

### Технологии

- **Vite** — сборка и дев-сервер
- **HTML5 / SCSS** — семантическая разметка и стили, БЭМ-нейминг
- **Vanilla JS (ESM)** — интерактивность (`Accordion`, `BurgerMenu`, `PricingModal`, `Scrolling`, кастомный `Slider`)
- **Stylelint / ESLint / Prettier / Husky** — линтинг и форматирование
- **GitHub Actions + GitHub Pages** — CI/CD и деплой

### Основные фичи

- **Горизонтальный слайдер портфолио на чистом JS** (`src/scripts/Components/Slider.js`):
  - По умолчанию контентная дорожка выровнена по центру страницы.
  - На десктопе прокрутка активируется при наведении на левые/правые области шириной ~30% экрана; центральная зона неактивна.
  - На мобильных устройствох слайдер листается свайпом пальцем.
  - Крайние положения выровнены по контенту, прокрутка ограничена границами (за края уйти нельзя).
- **Адаптивный интерфейс**: секции `about`, `portfolio`, `pricing`, `faq`, `contacts` с корректным отображением от мобильных до десктопа.
- **Интерактивность**:
  - Бургер-меню для навигации.
  - FAQ-аккордеон.
  - Модальные окна с ценами и формой записи.
  - Плавный скролл по якорям.

### Скрипты

В проекте используется npm:

```bash
npm install        # установка зависимостей
npm run dev        # дев-сервер Vite (http://localhost:5173 по умолчанию)
npm run build      # продакшн-сборка в каталог dist
npm run preview    # предпросмотр собранного билда

npm run lint       # запуск всех линтеров
npm run lint:js    # только ESLint
npm run lint:css   # только Stylelint
```

### Деплой на GitHub Pages

Деплой настроен через GitHub Actions:

- Конфигурация Vite (`vite.config.js`) использует `base: "/portfolio/"` для корректных путей при размещении в Pages.
- Workflow `.github/workflows/deploy.yml`:
  - Собирает проект (`npm ci` → `npm run build`).
  - Публикует содержимое `dist` в GitHub Pages.
- Pages в репозитории настроен на источник **GitHub Actions**, итоговый сайт доступен по адресу  
  [`https://thisvolwebnik.github.io/portfolio/`](https://thisvolwebnik.github.io/portfolio/).

# portfolio
