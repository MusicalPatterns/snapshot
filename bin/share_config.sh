#!/usr/bin/env bash

set +e

. ../../../node_modules/@musical-patterns/cli/bin/non_cli/share_file.sh
share_file Makefile.snapshot
share_file test/snapshot.test.ts
