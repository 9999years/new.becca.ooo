#!/bin/sh

errors=0

while read -r line || [[ -n "$line" ]]; do
	# skip comments
	if [[ "$line" == \#* ]]; then continue; fi
	if [[ ! -f "$line" ]]
	then
		# write stderr
		>&2 echo "\`$line\` should exist but doesn't!"
		let "errors += 1"
	else
		echo "\`$line\` exists"
	fi
done < "$1"

if [[ errors -eq 0 ]]
then
	echo "all files exist :-)"
	exit 0
else
	>&2 echo "$errors files were not found"
	exit -1
fi
