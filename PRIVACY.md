# Paypa Flags — Privacy Policy

**Last updated: 15 September 2026**

Paypa Flags is a browser extension published by Paypa Plane for use by its own engineering team. It
is a development and testing tool.

## The short version

Paypa Flags collects nothing. It has no analytics, no telemetry, no crash reporting, no accounts and
no server of its own. Everything you do with it stays in your browser, on your machine.

## What the extension stores

Everything the extension stores is written to your browser's local extension storage
(`chrome.storage.local`) and stays on the device you are using. None of it is synced to another
device and none of it is transmitted anywhere. It is:

- **Flag overrides** — which Launch Darkly feature flags you have forced on or off, per host.
- **Mock scenarios** — the test payment data you build in the editor, and which scenarios are
  currently active on which host.
- **Preferences** — your colour theme, whether the in-page debug widget is shown, and similar UI
  settings.
- **A cached copy of the flag list** — see below.

You can delete all of it at any time by removing the extension from your browser, which discards its
storage.

## What the extension does not collect

Paypa Flags does not collect, store or transmit any personal or sensitive information. Specifically,
it does not collect personally identifiable information, health information, financial or payment
information, authentication information, personal communications, location, web history, or user
activity. It does not read the content of the pages you visit, and it does not track you.

## Network requests

Paypa Flags makes exactly one network request, and it sends no information about you with it.

It downloads `https://raw.githubusercontent.com/paypaplane/paypa-flags/main/flags.json`, a public
file listing the names and descriptions of the feature flags the tool can override, so that it can
show you a readable list instead of raw flag ids. The request is an unauthenticated GET; no cookies,
credentials, identifiers or user data accompany it. The response is data, not code — it is parsed as
JSON and rendered as text, never executed. A copy is cached locally so the list still works offline.

The extension has no server of its own and communicates with no other service.

## Where the extension runs

Paypa Flags is restricted to the Paypa Plane application hosts named in its manifest, their preview
deployments, and local development servers (`localhost`, `127.0.0.1`). On every other website it does
nothing at all — its content scripts are not loaded there.

On those hosts, the extension passes the flag overrides and mock data you configured to the page
before the application starts. It does not read data out of the page, and it does not modify or
intercept the application's network traffic.

## Third parties

Paypa Flags shares no data with anyone, because it collects none. It contains no third-party
analytics, advertising or tracking code.

## Changes to this policy

If this policy changes, the updated version will be published at the same address and the date at the
top of this document will change.

## Contact

Questions about this policy or the extension: support@paypaplane.com
