#!/usr/bin/env bash

set -e

tsc -p tsconfig.node.json
if [[ $? == 0 ]] ; then
	NODE_ENV=test ts-node -P tsconfig.node.json node_modules/@musical-patterns/snapshot/bin/snapshot.js
fi
