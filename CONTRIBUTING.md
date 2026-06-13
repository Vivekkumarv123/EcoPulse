# Contributing to EcoPulse

Thanks for contributing! Suggested workflow:

1. Create a feature branch: `git checkout -b feat/your-change`
2. Run tests: `npm test`
3. Run lint and type-check: `npm run lint && npm run type-check`
4. Open a PR with a clear description and link to related docs.

Guidelines:
- Preserve accessibility and security patterns
- Add tests for new behavior
- Keep components under ~200 LOC
- Extract business logic into hooks/utilities
- Use centralized constants in `src/lib/formConstants.ts`
