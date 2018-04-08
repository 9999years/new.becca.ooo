#!/bin/bash

RED="\e[32m"
GREEN="\e[32m"
NC="\e[0m"

echo_err() {
	echo -e -n "$RED"
	echo $1
	echo -e -n "$NC"
}

errors=0

while read -r line || [[ -n "$line" ]]; do
	# skip comments
	if [[ "$line" == \#* ]]; then continue; fi
	if [[ ! -f "public/$line" ]]
	then
		echo_err "☒ \`$line\` should exist but doesn't!"
		let "errors += 1"
	else
		echo "☑ \`$line\`"
	fi
done < "$1"

if [[ errors -eq 0 ]]
then
	echo "all files exist :-)"
else
	echo_err "$GREEN$errors files were not found$NC"
	exit 1
fi
