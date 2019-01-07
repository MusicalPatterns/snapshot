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

This snapshot is used by the snapshot test to ensure the pattern stays locked down unless you mean to change it.
When you import a published pattern, you can import either the snapshot, or the pattern if you want to customize it before performing by configuring its spec and recompiling it.
