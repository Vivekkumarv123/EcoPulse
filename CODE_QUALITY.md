# Code Quality

## Purpose
This document defines the quality standards, tooling, and review expectations for EcoPulse.
It is intended to help maintain a consistent, maintainable, and secure codebase while preserving existing functionality.

## Quality Objectives
- Maintain strict TypeScript safety across `src/`
- Keep lint output free of errors and relevant warnings
- Preserve UI and business behavior while refactoring
- Keep tests stable and comprehensive for regression protection
- Avoid magic numbers, duplicate logic, and untyped behavior
- Keep documentation current and aligned with code

## Quality Gates
| Gate | Requirement |
|---|---|
| Type checking | `npm run type-check` passes with zero errors |
| Linting | `npm run lint` passes with zero errors |
| Build | `npm run build` succeeds |
| Tests | `npm test` passes |
| Formatting | `npm run format:check` succeeds |

## Tooling
- `typescript` for static type safety
- `eslint` with `next/core-web-vitals`, `next/typescript`, and security rules
- `vitest` for unit, integration, and accessibility tests
- `prettier` for consistent formatting
- `zod` for runtime validation and schema-driven type inference
- `tailwindcss` for utility-driven styling with shared classes

## Core Standards
### TypeScript
- No `any` usage in production code
- Prefer readonly arrays and objects wherever possible
- Use explicit inline types for component props and hook return values when it improves clarity
- Keep utility return types strongly defined to avoid unsafe casting

### Architecture
- Follow single responsibility principle for components, hooks, and utilities
- Prefer composition over monolithic components
- Keep presentational components separate from business logic
- Use custom hooks for derived state and side effects
- Keep shared constants in `src/lib/` and shared types in `src/types/`

### Naming
- Use descriptive, consistent names for components, hooks, and utilities
- Prefix hooks with `use` and memoized components with `React.memo` as appropriate
- Keep file names aligned with exported symbols
- Avoid vague names such as `data`, `item`, or `value` where a domain-specific name is clearer

### Documentation
- Add JSDoc comments for exported modules, hooks, and utility functions
- Document purpose, inputs, outputs, and behavior for shared modules
- Keep markdown docs in sync with current repo structure

### Comments
- Use comments to explain why non-obvious code exists
- Avoid comments that restate obvious code logic
- Prefer self-documenting code where possible

## Testing and Validation
### Required Test Coverage
- `src/lib/` utilities and calculators
- `src/hooks/` state logic and derived data
- `src/components/` forms, dashboard, provider flows
- Accessibility test cases for dynamic and interactive elements
- Edge cases for invalid local storage and schema validation

### Commands
```bash
npm run lint
npm run type-check
npm run build
npm test
npm run format:check
```

### Test Practices
- Add tests for new logic before refactor completion
- Keep regression tests for critical flows such as assessment submission, goal and challenge creation, and dashboard rendering
- Use `vitest-axe` for accessibility validation where UI behavior changes
- Keep fixture data minimal and representative

## Refactoring Guidelines
- Preserve public behavior, UI, and business logic when refactoring
- Extract shared elements into reusable components when duplication is found
- Keep hook internals focused on state and effect management
- Move constants and thresholds into `src/lib/` to avoid embedded magic values
- Use memoization for expensive derived values or repeated calculations

## Security and Safety
- Validate all persisted and runtime input with `zod`
- Sanitize freeform text before storage and display
- Guard localStorage access for server-side render environments
- Version persisted payloads and recover safely from invalid data

## Recommended Repo Practices
- Keep `README.md`, `TESTING.md`, `SECURITY.md`, and `CODE_QUALITY.md` aligned
- Update docs when architecture or quality requirements change
- Review pull requests for naming, modularity, and documentation
- Enforce lint, type-check, and tests in pre-merge checks

## Maintenance
- Remove remaining magic numbers when a meaningful constant can be defined
- Consolidate UI and form controls into shared components when the same pattern repeats
- Keep exported module JSDoc updated for components, hooks, and library functions
- Review code quality metrics after refactors and ensure all quality gates pass
