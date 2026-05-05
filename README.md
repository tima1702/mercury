# Заявка на займ — тестовое задание

SPA из трёх шагов: личные данные → адрес и место работы → параметры займа.
Данные собираются в общий стор, на третьем шаге уходят в `dummyjson`,
после ответа показывается модалка с подтверждением.

## Стек

- **Vite + React 19 + TypeScript** — strict-режим компилятора, билд через `tsc -b && vite build`, прод-чанки
- **react-router-dom v7** — роутинг по шагам (`/`, `/step2`, `/step3`); прямой переход на `/step2` или `/step3` без валидных данных предыдущих шагов перехватывает `StepGuard` (`src/App.tsx`) и редиректит на `/`.
- **Zustand** (`src/store/formStore.ts`) — один стор на всю форму с тремя слайсами (`step1`/`step2`/`step3`), сеттерами и `reset()`. Селекторами подписываюсь точечно (`useFormStore((s) => s.step1)`)
- **react-hook-form + zod + @hookform/resolvers** — `useForm` с `zodResolver`, схемы в `src/schemas/` (`step1.ts`, `step2.ts`, `step3.ts`), типы выводятся через `z.infer`. На step1 и step2 `mode: 'onTouched'`; submit идёт только при валидной схеме.
- **useAutoSave** (`src/hooks/useAutoSave.ts`) — кастомный хук поверх `watch()` из RHF: подписка на изменения формы + `setTimeout` 300 мс → запись в Zustand-сеттер. Возвращение «Назад» сохраняет ввод даже без клика «Далее».
- **TanStack Query + axios** — `useQuery({ queryKey: ['categories'] })` в `WorkplaceSelect` (`src/components/WorkplaceSelect.tsx`); рендер по `query.status` (`pending`/`error`/`success`) ранними возвратами. Глобально `staleTime: Infinity`, `gcTime: Infinity`, `refetchOnWindowFocus: false` (`src/main.tsx`) повторных запросов нет.
- **react-international-phone** — без libphonenumber-js, маски и флаги встроены. `defaultCountry` определяется по `navigator.language` / `navigator.languages` через `new Intl.Locale(...).region` (`src/components/PhoneInput.tsx`), фоллбэк — `us`. Валидация телефона на zod-уровне: E.164 regex `^\+\d{8,15}$`.
- **Sass** — `src/styles/index.scss`, переменные + nesting; фокус-ринг группы 
- **Bootstrap 5** — только CSS-бандл, без JS. Используется для form-control/form-select/grid и разметки модалки.
- **Vitest + @testing-library/react + jsdom** — юнит-тесты на схемы, стор и `SuccessModal` (`src/**/__tests__/`).

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

## Время выполнения

Около 2–3 часов.
