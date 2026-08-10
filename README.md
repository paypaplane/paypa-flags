# paypa-flags

A public registry of feature flags loaded by PayPa Plane's extension at runtime, so flags can be changed without rebuilding or resubmitting the app.

## Structure

Flags are defined in [`flags.json`](./flags.json) as a single JSON object keyed by flag name. Each flag has:

- `title` — a short human-readable name for the flag
- `description` — what the flag does and when it should be used

Example:

```json
{
    "enable-example-feature": {
        "title": "Enable Example Feature",
        "description": "Description of what this flag controls."
    }
}
```

## Adding a flag

1. Add a new entry to `flags.json` using a `kebab-case` key prefixed with `enable-` (or another clear verb) describing what it toggles.
2. Provide a concise `title` and a `description` that explains the effect of enabling the flag and any fallback behavior.
3. Open a pull request for review.

## Naming conventions

- Use `enable-*` for flags that turn a feature on.
- Keep descriptions specific about scope (e.g. which routes, components, or user types are affected) and any fallback behavior when disabled.
