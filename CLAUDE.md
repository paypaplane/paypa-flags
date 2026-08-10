# paypa-flags

A public registry of feature flags loaded by PayPa Plane's extension at runtime (see README.md).

## Adding a flag

Use the `/add-flag` skill to add a new entry to `flags.json`. It prompts for the
flag's key, title, and description, normalizes the key to kebab-case with an
`enable-` prefix, appends the entry, and runs `scripts/lint-flags.js` to
validate the file. Prefer this over hand-editing `flags.json`.
