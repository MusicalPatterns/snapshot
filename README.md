[![Build Status](https://travis-ci.com/MusicalPatterns/snapshot.svg?branch=master)](https://travis-ci.com/MusicalPatterns/snapshot)

# Musical Patterns - Snapshot

Similar to the `@musical-patterns/cli` repo, upon installation, copies snapshot files into the pattern repo.

These files are:

- Makefile.snapshot
- test/snapshot.test.ts

When inside the directory of a pattern for which you want to update the snapshot, run:

```
musical-patterns-snapshot
```

Uses the `@musical-patterns/compiler` to maintain an up-to-date copy of compiled pattern data in the repo.
This `snapshot.json` file is tested against before each shipment, ensuring your pattern doesn't change if you don't mean it to.
It also can be played directly by the `@musical-patterns/performer` if you are performing in an environment without a `@musical-patterns/compiler`, or simply don't need to modify the pattern's initial spec.
