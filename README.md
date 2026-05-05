# Заявка на займ — тестовое задание

SPA из трёх шагов: личные данные → адрес и место работы → параметры займа.
Данные собираются в общий стор, на третьем шаге уходят в `dummyjson`,
после ответа показывается модалка с подтверждением.

## Стек

- **Vite + React 19 + TypeScript**
- **react-router-dom** — переключение между шагами (требование ТЗ).
- **Zustand** — общий стор формы (`src/store/formStore.ts`). Данные
  всех трёх шагов доступны на любом шаге, после успешной отправки —
  `reset()` к начальному состоянию.
- **react-hook-form + zod + @hookform/resolvers** — валидация форм,
  типизированные схемы (`src/schemas/`). Каждый шаг автосохраняется
  в стор с дебаунсом 300 мс (`src/hooks/useAutoSave.ts`), чтобы
  «Назад» возвращал введённые данные даже без клика «Далее».
- **TanStack Query + axios** — `useQuery` для `GET /products/category-list`
  с кешированием результата (`staleTime: Infinity`), повторных запросов
  не делается.
- **react-international-phone** — поле телефона с селектором страны и
  автоматической маской по формату страны. По умолчанию страна определяется
  из `navigator.language` через `Intl.Locale.region`, фоллбэк — `us`.
- **Sass** — стили в `src/styles/index.scss`, переменные + nesting.
- **Bootstrap** (только CSS) — базовая стилизация форм и модалки.

## Перформанс

- Каждый шаг загружается отдельным чанком через `React.lazy` + `Suspense`
  (`src/App.tsx`). На первом экране в бандле нет кода step2/step3.
- TanStack Query кеширует категории — повторный заход на шаг 2 уже не идёт
  в сеть.

## Запуск

```bash
npm install
npm run dev
```

Прод-сборка:

```bash
npm run build
npm run preview
```

Тесты (Vitest + Testing Library):

```bash
npm test            # один запуск
npm run test:watch  # watch-режим
```

## Стенд

- **Стенд:** [https://mercury.tima1702.dev](https://mercury.tima1702.dev)
- На сервере лежит только `/opt/mercury/docker-compose.yml`. Образ
  собирается локально и переносится через `docker save | ssh | docker load`
  — на сервере ничего не билдится.
