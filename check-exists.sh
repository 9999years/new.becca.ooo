#!/bin/bash

echo_err() {
	echo -e -n "\033[0;31m"
	echo $1
	echo -e -n "\033[0m"
}

errors=0

while read -r line || [[ -n "$line" ]]; do
	# skip comments
	if [[ "$line" == \#* ]]; then continue; fi
	if [[ ! -f "$line" ]]
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
	exit 0
else
	echo_err "$errors files were not found"
	exit 1
fi
