# Test Suite Sportiverse

## Struttura

- `unit/` - Test unitari con Vitest
- `e2e/` - Test end-to-end con Playwright
- `security/` - Security smoke tests

## Esecuzione

```bash
# Test unitari
pnpm test

# Test e2e
pnpm e2e

# Coverage report
pnpm test --coverage
```

## Requisiti

- Coverage ≥ 90%
- Tutti i test e2e devono passare
- Security tests per OWASP Top 10