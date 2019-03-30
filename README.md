[![Build Status](https://travis-ci.com/MusicalPatterns/snapshot.svg?branch=master)](https://travis-ci.com/MusicalPatterns/snapshot)

# Musical Patterns - Snapshot

Similar to the `@musical-patterns/cli` repo, upon installation, copies snapshot files into the pattern repo.

These files are:

- Makefile.snapshots
- test/snapshots.test.ts

When inside the directory of a pattern for which you want to update the snapshot, run:

```
musical-patterns-snapshots
```

Or `make snapshots` since the `Makefile.snapshots` aliases it like that.

Uses the `@musical-patterns/compiler` to maintain an up-to-date copy of compiled pattern data in the repo.
This `snapshots.json` file is tested against before each shipment, ensuring your pattern doesn't change if you don't mean it to.
It tests your initial specs as well as the specs for each preset.
