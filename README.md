# ScrapX Monorepo

This repository is a Turborepo-powered monorepo managed with PNPM workspaces. It consolidates all apps and services under a single codebase with shared tooling for TypeScript, ESLint, Prettier, Commitlint, and Husky.

## Workspace layout

- apps/mobile — Expo React Native app
- apps/admin — Next.js web admin
- apps/api — NestJS HTTP API
- services/ai — FastAPI microservice for AI endpoints
- packages/types — Shared TypeScript types
- packages/utils — Shared utility functions
- packages/ui — Shared React UI components
- packages/config — Shared configuration helpers

Workspaces are defined in `pnpm-workspace.yaml`.

## Getting started

1) Install Node.js >= 18.18 and pnpm (this repo uses `packageManager: pnpm@9.x`)

2) Install dependencies

   pnpm install

   Husky will be set up automatically via the `prepare` script once dependencies are installed.

3) Create local environment files as needed from the example

   cp .env.example .env

## Common scripts

All tasks are executed via Turbo across the monorepo:

- pnpm build — Runs build in all workspaces respecting the task graph
- pnpm dev — Runs dev in parallel where defined (not cached)
- pnpm lint — Runs ESLint using the shared root config
- pnpm typecheck — Runs TypeScript type checking
- pnpm test — Runs tests where defined
- pnpm format — Formats files with Prettier

Per-workspace scripts (examples):

- pnpm --filter @acme/admin dev — Start Next.js admin
- pnpm --filter @acme/mobile dev — Start Expo mobile bundler
- pnpm --filter @acme/api dev — Start NestJS API in watch mode

## Docker

A simple compose is provided to run the API and AI services together:

- docker-compose up --build

This will start:

- API (NestJS) on http://localhost:3000
- AI (FastAPI) on http://localhost:8000

Note: The provided Dockerfiles are minimal and intended for local development.

## Shared configurations

The following shared configs live at the repository root and are intended to be used by all packages/apps:

- ESLint: eslint.config.mjs (Flat config, with TypeScript, React, and React Native plugins)
- Prettier: prettier.config.cjs
- TypeScript: tsconfig.base.json (includes path aliases for packages via @acme/*)

Downstream packages/apps should:

- Rely on the root eslint.config.mjs by default (ESLint searches up the directory tree)
- Extend tsconfig.base.json by creating a local tsconfig.json with `{ "extends": "../../tsconfig.base.json" }` (adjust the relative path as needed)
- Use Prettier from the root by default; no local config is necessary

## Git hooks & commit conventions

- Commit messages are validated by Commitlint (Conventional Commits)
- Pre-commit runs lint-staged to lint and format staged files
- Pre-push runs `turbo run lint test`

Husky hooks are stored in `.husky/` and installed via `pnpm install`. The hooks are safe no-ops if Husky or dependencies are not yet installed.

## Turbo pipeline

The Turbo pipeline is defined in `turbo.json` with standard tasks: `build`, `typecheck`, `lint`, `test`, and `dev`.

## TypeScript path aliases

`tsconfig.base.json` defines the following alias used across the repo:

- @acme/* resolves to packages/*/src

Example usage:

import { Button } from '@acme/ui'
import { greet } from '@acme/utils'

## Notes

- The repo is configured to work best with PNPM. If you use another package manager locally, results may vary.
- To keep CI fast, Turbo caches outputs for `build` and `test` by default. The `dev` task is not cached and is marked as `persistent`.
