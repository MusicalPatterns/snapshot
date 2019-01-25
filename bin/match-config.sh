#!/usr/bin/env bash

set -e

check_match() {
	FILE="$1"

	set +e
	cmp -s "${FILE}" "node_modules/@musical-patterns/snapshot/share/${FILE}"
	if [[ $? != 0 ]] ; then
		echo "mismatch against standardized configuration: ${FILE}"
		set -e
		return 1
	fi
	set -e
}

shopt -s globstar
shopt -s dotglob
for SHARED_FILE in node_modules/@musical-patterns/snapshot/share/**/*
do
	if [[ -f "${SHARED_FILE}" ]]; then
		check_match ${SHARED_FILE:46}
	fi
done
