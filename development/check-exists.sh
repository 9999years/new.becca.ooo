#!/bin/bash

RED="\e[31m"
GREEN="\e[32m"
NC="\e[0m"

echo_fmt() {
	echo -e -n "$1"
	echo "$2"
	echo -e -n "$NC"
}

errors=0

while read -r line || [[ -n "$line" ]]; do
	# skip comments
	if [[ "$line" == \#* ]]; then continue; fi
	if [[ ! -f "public/$line" ]]
	then
		echo_fmt "$RED" "☒ \`$line\` should exist but doesn't!"
		(( errors += 1 ))
	else
		echo "☑ \`$line\`"
	fi
done < "$1"

if [[ errors -eq 0 ]]
then
	echo_fmt "$GREEN" "all files exist 😊🎉🥂"
else
	echo_fmt "$RED" "$errors files were not found 😥💔"
	exit 1
fi
