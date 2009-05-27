#!/bin/sh

rm -R build
mkdir build
cp ../../../build/jshamcrest.js build

BROWSER_PATH="$1"

if [ -z "$1" ]; then 
	BROWSER_PATH="`which firefox`"
fi

java -jar JsTestDriver-1.0b.jar --port 4224 --browser "$BROWSER_PATH"
