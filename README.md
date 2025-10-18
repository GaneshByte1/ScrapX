# Monorepo

This repository is a Turborepo-powered monorepo managed with PNPM workspaces. It provides shared tooling for TypeScript, ESLint, Prettier, Commitlint, and Husky, plus a preconfigured Turbo pipeline for common tasks.

## Workspace layout

- `apps/*` — Application projects (web, mobile, CLI, etc.)
- `services/*` — Service projects (APIs, workers, etc.)
- `packages/*` — Shared libraries and packages

Workspaces are defined in `pnpm-workspace.yaml`.

## Getting started

1. Install Node.js >= 18.18 and pnpm (this repo uses `packageManager: pnpm@9.x`)
2. Install dependencies

   ```bash
   pnpm install
   ```

   Husky will be set up automatically via the `prepare` script.

3. Create local environment files as needed from the example

   ```bash
   cp .env.example .env
   ```

## Common scripts

All tasks are executed via Turbo across the monorepo:

- `pnpm build` — Runs `build` in all workspaces respecting task graph
- `pnpm dev` — Runs `dev` in parallel where defined (not cached)
- `pnpm lint` — Runs ESLint using the shared root config
- `pnpm typecheck` — Runs TypeScript type checking
- `pnpm test` — Runs tests where defined
- `pnpm format` — Formats files with Prettier

Each package/app should define the corresponding scripts (e.g., `build`, `dev`, `lint`, `typecheck`, `test`) that Turbo will invoke.

## Shared configurations

The following shared configs live at the repository root and are intended to be used by all packages/apps:

- ESLint: `eslint.config.mjs` (Flat config, with TypeScript, React, and React Native plugins)
- Prettier: `prettier.config.cjs`
- TypeScript: `tsconfig.base.json`

Downstream packages/apps should:

- Rely on the root `eslint.config.mjs` by default (ESLint searches up the directory tree)
- Extend `tsconfig.base.json` by creating a local `tsconfig.json` with `{ "extends": "../../tsconfig.base.json" }` (adjust the relative path as needed)
- Use Prettier from the root by default; no local config is necessary

## Git hooks & commit conventions

- Commit messages are validated by Commitlint (Conventional Commits)
- Pre-commit runs `lint-staged` to lint and format staged files
- Pre-push runs `turbo run lint test`

Husky hooks are stored in `.husky/` and installed via `pnpm install`.

## Turbo pipeline

The Turbo pipeline is defined in `turbo.json` with standard tasks: `build`, `typecheck`, `lint`, `test`, and `dev`.

## Using the shared configs in a new workspace package

Example `packages/my-lib/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src"]
}
```

Example `packages/my-lib/package.json` scripts:

```json
{
  "name": "@acme/my-lib",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json --outDir dist",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "lint": "eslint src --max-warnings=0",
    "test": "echo 'no tests yet'"
  }
}
```

ESLint will pick up the root `eslint.config.mjs` automatically. If you need package-specific rules, you can create a local `eslint.config.mjs` that imports and augments the root config.

## Notes

- The repo is configured to work best with PNPM. If you use another package manager locally, results may vary.
- To keep CI fast, Turbo caches outputs for `build` and `test` by default. The `dev` task is not cached and is marked as `persistent`.
