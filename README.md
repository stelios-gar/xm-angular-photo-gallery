# XM Angular Photo Gallery

Angular 16 photo gallery application built as a home assignment.

## Overview

This application displays a random photo stream and allows users to add photos to a separate favorites page. Favorite photos persist after refresh. A detail page is provided for each selected favorite photo.

The app was implemented with Angular Router, SCSS, Angular Material, custom infinite scroll, localStorage persistence, and unit tests.

## Features

- Photo stream page
- Custom infinite scroll without external infinite-scroll libraries
- Random photo generation using Picsum seed URLs
- Add photos to favorites
- Favorites page with persisted state using localStorage
- Photo detail page with larger image preview
- Remove photos from favorites
- Fixed shared header navigation
- Reusable photo card component
- Reusable loading spinner component
- Unit tests with Jasmine/Karma
- 100% reported test coverage for statements, branches, functions, and lines

## Routes

```txt
/photos
/favorites
/photos/:id
```

## Tech Stack

* Angular 16.1.8
* TypeScript
* SCSS
* Angular Material
* RxJS
* Jasmine / Karma
* localStorage

## Project Structure

```txt
src/app/
  core/
    services/
      photo.service.ts
      favorites.service.ts

  features/
    photos/
      photos-page/
    favorites/
      favorites-page/
    photo-detail/
      photo-detail-page/

  shared/
    components/
      header/
      photo-card/
      loading-spinner/
    models/
      photo.ts
```

## Photo Source

Photos are generated with Picsum seed URLs:

```txt
https://picsum.photos/seed/{id}/200/300
https://picsum.photos/seed/{id}/600/800
```

Seed URLs are used instead of plain random image URLs so each photo has a stable id and image URL. This makes favorites, persistence, and the detail page reliable after refresh.

## Install

```bash
npm install
```

## Run Development Server

```bash
npm start
```

or:

```bash
npm run serve
```

Open:

```txt
http://localhost:4200
```

## Build

```bash
npm run build
```

## Run Tests

```bash
npm run test:ci
```

## Run Tests With Coverage

```bash
npm run test:coverage
```

Current local test result:

```txt
42/42 tests passing
Statements: 100%
Branches: 100%
Functions: 100%
Lines: 100%
```

Note: On the local macOS / Chrome environment, Karma may show a browser reload warning after the tests complete. The Jasmine test assertions complete successfully and report all tests passing.

## Implementation Notes

* Infinite scroll is implemented manually using Angular and native browser scroll events.
* No external infinite-scroll package is used.
* Favorites are stored in localStorage because no backend is required.
* The first photo batch is followed by an additional check to ensure the page becomes scrollable even on large screens.
* The header layout was adjusted to stay close to the provided gallery mockup.