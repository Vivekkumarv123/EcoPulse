# Code Quality Standards

**Engineering Standard — Internal Review Reference**

---

## 1. Engineering Principles

All code must adhere to these foundational principles:

- **Single Responsibility**: Each function, hook, and component has exactly one reason to change.
- **Separation of Concerns**: Business logic, state management, and presentation are strictly separated.
- **Composition Over Inheritance**: Reusable behavior is achieved through hook composition and higher-order functions, not class hierarchies.
- **Immutable State**: State never mutates in-place. All updates create new values.
- **Defensive Programming**: Validate all untrusted input before use. Fail fast on invalid data.
- **Pure Functions**: Utilities have no side effects and return consistent results for identical inputs.
- **Explicit Dependencies**: Dependencies are declared explicitly. No implicit globals or side channels.

---

## 2. Architecture Constraints

The following invariants are non-negotiable:

- **UI components never calculate business logic**: Calculations belong in hooks or utilities only.
- **Hooks never access DOM directly**: DOM queries are deferred to components.
- **Utilities remain side-effect free**: No I/O, state mutations, or external calls in util functions.
- **Components never access storage directly**: All storage access flows through hooks and providers.
- **Validation occurs before persistence**: Data is validated before any write to storage.
- **No circular dependencies**: Dependency graph is acyclic (verifiable via tooling).
- **State mutations only through provider actions**: No direct state assignment outside action creators.
- **Context providers never nest business logic**: Providers initialize and expose state/actions only.

---

## 3. TypeScript Standards

### Compiler Configuration

The following flags are required in `tsconfig.json`:

- `strict: true` — Enables all strict type checking.
- `noImplicitAny: true` — Forbids implicit `any` types.
- `noUnusedLocals: true` — Errors on unreachable variables.
- `noUnusedParameters: true` — Errors on unused function parameters.
- `noFallthroughCasesInSwitch: true` — Prevents fall-through in switch statements.
- `exactOptionalPropertyTypes: true` — Distinguishes `undefined` from optional properties.

Verification:

```bash
npm run type-check
```

### Type Requirements

- **Never use `any`**: All values must have explicit types. External input defaults to `unknown`.
- **Explicit Interfaces**: All exported functions, components, and hooks define formal `interface` or `type` signatures.
- **Readonly Models**: All data types use `Readonly<T>` to prevent accidental mutations.
- **Path Aliases**: Imports use `@/` aliases (`@/components`, `@/hooks`, `@/lib`, `@/types`). No relative paths across directories.
- **Safe Parsing**: Zod schemas parse external data. Type inference derives from `z.infer<typeof Schema>`.

---

## 4. React Standards

### Component Discipline

- **Functional Components Only**: Class components are forbidden except `ErrorBoundary`.
- **No Inline Calculations**: Derived values are computed in hooks using `useMemo`.
- **Stable Callbacks**: Event handlers use `useCallback` with explicit dependency arrays.
- **Memoization**: Components wrapped in `React.memo` must have stable props.
- **Controlled Components**: Form inputs always have explicit `value` and `onChange`.
- **Component Size**: Maximum 300 lines per component file. Exceed this only with architectural justification.
- **No Props Drilling**: State is accessed through hooks (`useContext`) or providers, not passed through intermediate components.

### Hook Discipline

- **Custom Hooks Encapsulate Logic**: Business logic, validation, and calculations live in hooks, not components.
- **Hook Naming**: All hooks begin with `use` prefix.
- **Hook Size**: Maximum 150 lines. Larger logic is broken into smaller composed hooks.
- **Dependency Arrays**: All `useEffect`, `useCallback`, and `useMemo` have correct and minimal dependency arrays.

---

## 5. Folder Ownership Rules

| Folder | Ownership | Responsibilities | Constraints |
|--------|-----------|------------------|------------|
| `app/` | App Router config | Route definitions, layout wrappers, top-level providers | No business logic. No hook state. |
| `components/` | UI presentation | Render trees, event bindings, layout | Never calculate. Never access storage. Use hooks only. |
| `hooks/` | Business logic | State management, form handling, calculations | May import from lib/ and types/ only. |
| `lib/` | Utilities & schemas | Pure functions, Zod schemas, type definitions | No React imports. No component imports. |
| `types/` | Type definitions | Interface and type exports | Derived from Zod schemas. No implementation. |
| `test/` | Test infrastructure | Vitest configuration, mocks, test utilities | No production code. |

### Forbidden Imports

- `lib/` may not import `components/`, `hooks/`, or `app/`.
- `components/` may not import `hooks/` or `lib/` for business logic (only type imports).
- `hooks/` may not import `app/` or `components/`.
- `app/` may not import business logic directly; routes use components and context.

---

## 6. Dependency Graph

Allowed dependency direction (top-to-bottom):

```
app/
  ↓
components/
  ↓
hooks/
  ↓
lib/
  ↓
types/
```

**Forbidden Examples:**

- `lib/` importing a component.
- `hooks/` importing a route handler.
- `components/` calling utility functions that depend on React.
- Circular `app/` ← `components/` imports.

---

## 7. Naming Conventions

### Components

- PascalCase: `AssessmentForm`, `BreakdownCard`, `Header`.
- Files: `ComponentName.tsx`.
- Tests: `ComponentName.test.tsx` or `ComponentName.accessibility.test.tsx`.
- Exports: Named exports only. No default exports.

### Hooks

- Prefix: `use` (e.g., `useFootprint`, `useAssessmentForm`, `usePagination`).
- Files: `useHookName.ts`.
- Tests: `useHookName.test.ts`.
- Return value: Tuple or object with descriptive names.

### Utilities

- camelCase: `calculateEntryCarbon()`, `stripDangerousKeys()`, `escapeHtml()`.
- Files: `utilityName.ts`.
- Pure functions only.

### Constants

- SCREAMING_SNAKE_CASE: `STORAGE_VERSION`, `DEFAULT_CATEGORY`.
- Grouped by domain.
- Exported from centralized constants files.

### Types & Interfaces

- PascalCase: `CarbonEntry`, `ValidationError`, `FootprintState`.
- Suffixes: `Schema` for Zod definitions, `Type` for derived types.
- Files: Exported from `types/index.ts`.

### Test Files

- Pattern: `<name>.test.ts` or `<name>.test.tsx`.
- Organization: Mirror source structure.
- Naming: Describe behavior, not implementation.

---

## 8. Performance Standards

### Complexity Limits

| Metric | Limit | Rationale |
|--------|-------|-----------|
| Function Length | 50 lines | Cognitive complexity |
| Component Length | 300 lines | Maintainability |
| Nesting Depth | 3 levels | Readability |
| Cyclomatic Complexity | ≤ 5 | Test coverage |

### Calculation Standards

- **Single-Pass Aggregation**: O(N) aggregations compute all metrics in one iteration over data.
- **Memoized Derivations**: Derived values (`useMemo`) recompute only when dependencies change.
- **Stable References**: Callbacks cached via `useCallback` maintain reference equality across renders.
- **No Duplicate Calculations**: Identical logic appears in exactly one location.
- **Lazy Computation**: Heavy calculations defer to `useMemo` or `useCallback`.

### Forbidden Patterns

- Computing derived values in render (e.g., `.map()` in JSX).
- Calling expensive functions in component body without memoization.
- Recreating callbacks on every render.
- Iterating over data multiple times for separate aggregations.

---

## 9. Security Standards

### Input Validation

- **Zod Parsing**: All external data parsed via `safeParse()` before use.
- **Schema Versioning**: Persisted data wrapped in `StorageEnvelopeSchema` with version marker.
- **Unknown Type**: External input typed as `unknown`, never `any`.

### Data Sanitization

- **HTML Escaping**: Free-text fields sanitized via `escapeHtml()` before render or storage.
- **Recursive Cleaning**: Storage deserialization strips prototype pollution vectors (`__proto__`, `constructor`, `prototype`) via `stripDangerousKeys()`.

### Safe Operations

- **Secure UUIDs**: Generated via `crypto.randomUUID()` with fallback to timestamped hashes.
- **Silent Failures**: Storage quota errors fail silently without exposing system properties.
- **No Direct DOM Manipulation**: XSS prevention via React's automatic escaping. Manual DOM writes forbidden.

---

## 10. Accessibility Standards

### Semantic HTML

- Forms use `<fieldset>` and `<legend>` for grouped controls.
- Buttons are `<button>`, not `<div onclick>`.
- Links are `<a>` with `href`.
- Lists use `<ul>`, `<ol>`, `<li>`.

### Keyboard Navigation

- All interactive elements focusable with Tab.
- Active tab has `tabIndex={0}`; inactive tabs have `tabIndex={-1}`.
- Arrow keys navigate within tab lists and menus.
- Escape closes overlays.
- Focus visible via `:focus-visible` styles.

### Labels & Descriptions

- Every `<input>`, `<select>`, `<textarea>` has a matching `<label htmlFor="id">`.
- Contextual help linked via `aria-describedby`.
- Error messages associated with `aria-errormessage`.

### Live Regions

- Dynamic updates use `role="status"` with `aria-live="polite"`.
- Announcements are concise and non-disruptive.

### Visual Indicators

- Decorative SVG uses `aria-hidden="true"`.
- Data visualizations use `role="img"` with descriptive `aria-label`.
- Color is never the only indicator. Text or icons accompany colored states.

---

## 11. Testing Standards

### Test Execution

```bash
npm test                    # Run all tests
npm run test -- --coverage  # Generate coverage report
```

### Coverage Requirement

- **Minimum 80% coverage**: Enforced per merge.
- **Coverage tracks**: Lines, branches, functions, and statements.
- **Exclusions**: Only test utilities, mocks, and error boundaries may be excluded.

### Test Categories

- **Unit Tests**: Pure functions, utilities, schemas.
- **Integration Tests**: Hooks with multiple dependencies, provider interactions.
- **Accessibility Tests**: Components checked with `vitest-axe`.
- **Security Tests**: Sanitization, Zod parsing, prototype pollution.

### Test Quality

- **One assertion per test** (or grouped logical assertions).
- **Descriptive names**: Test names describe behavior, not implementation.
- **No test interdependencies**: Tests run in any order.
- **Deterministic**: No flaky tests. No time-dependent assertions.

---

## 12. Complexity Limits

### Function Constraints

- **Maximum 50 lines**: Functions exceed this only for specialized algorithms with justification.
- **Maximum 3 nesting levels**: Deep nesting indicates separation opportunity.
- **Cyclomatic Complexity ≤ 5**: Measured by conditional branches. Use early returns and composition to reduce.

### Component Constraints

- **Maximum 300 lines**: Components exceed this only with architectural review.
- **Single Responsibility**: One feature per component. Multiple features indicate splitting opportunity.
- **Prop Count ≤ 10**: Excess props indicate composition issues.

### Business Logic Constraints

- **No duplicated logic**: Identical algorithms appear once.
- **Reusable hooks**: Logic used in multiple places extracted to custom hooks.
- **Centralized schemas**: Validation rules defined once in Zod, reused everywhere.

---

## 13. Pull Request Quality Gates

**A PR cannot merge unless all gates pass:**

- [ ] Build succeeds with zero warnings.
- [ ] `npm run type-check` passes.
- [ ] `npm run lint` passes.
- [ ] `npm test` passes all tests.
- [ ] Coverage does not drop below 80%.
- [ ] Documentation updated for architecture changes.
- [ ] No accessibility regressions (manual or automated).
- [ ] Security review signed off (for auth, storage, or input handling changes).
- [ ] Commit messages follow Conventional Commits.
- [ ] Code follows naming conventions and folder ownership.

---

## 14. Code Review Checklist

Reviewers must verify each of these categories:

### Architecture & Design

- [ ] Dependencies flow top-to-bottom per dependency graph.
- [ ] No circular imports.
- [ ] Business logic isolated in hooks/utilities, not components.
- [ ] State mutations only through provider actions.

### Type Safety

- [ ] No `any` types.
- [ ] All exported APIs fully typed.
- [ ] External input validated via Zod before use.
- [ ] `unknown` used for untrusted data.

### Performance

- [ ] Derived values computed with `useMemo`.
- [ ] Callbacks cached with `useCallback`.
- [ ] No calculations in render.
- [ ] No unnecessary renders from unstable props.
- [ ] Single-pass aggregations where possible.

### Accessibility

- [ ] Semantic HTML used throughout.
- [ ] Keyboard navigation working.
- [ ] ARIA labels and descriptions appropriate.
- [ ] Focus management correct.
- [ ] No color-only indicators.

### Security

- [ ] All input validated before use.
- [ ] Sanitization applied to free text.
- [ ] Storage parsing uses safe envelope.
- [ ] No XSS vectors.
- [ ] UUID generation secure.

### Documentation

- [ ] JSDoc on all exported functions.
- [ ] Complex algorithms documented.
- [ ] Architecture.md updated if needed.
- [ ] Breaking changes noted.

### Testing

- [ ] Unit tests cover happy path and error cases.
- [ ] Integration tests validate hook contracts.
- [ ] Accessibility tests pass (`vitest-axe`).
- [ ] Test names are descriptive.
- [ ] No test interdependencies.

### Duplication

- [ ] No repeated business logic.
- [ ] Utilities reused across files.
- [ ] Schemas centralized in `lib/schemas.ts`.
- [ ] Constants in single source of truth.

### Complexity

- [ ] Functions under 50 lines.
- [ ] Components under 300 lines.
- [ ] Nesting under 3 levels.
- [ ] Cyclomatic complexity under 5.

---

## 15. PromptWar Alignment

| Category | Implementation | Evidence |
|----------|---|---|
| **Code Quality** | Strict TypeScript, ESLint security rules, modular hooks, zero `any`. | `tsconfig.json` strict mode; `npm run lint` enforced. |
| **Security** | Zod validation, prototype pollution sanitization, HTML escaping, safe storage parsing. | `stripDangerousKeys()`, `escapeHtml()`, versioned envelope. |
| **Efficiency** | O(N) aggregation, memoized derivations, stable references, single-pass calculations. | `useMemo` on aggregates, `useCallback` on handlers, indexed lookups. |
| **Testing** | Unit, integration, accessibility, and security tests. 80%+ coverage enforced. | Vitest suite, `vitest-axe` checks, coverage reporting. |
| **Accessibility** | Semantic HTML, keyboard navigation, ARIA labels, focus management, live regions. | Tested against WCAG 2.2 standards. Keyboard-navigable. Labeled controls. |
