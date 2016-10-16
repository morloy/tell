#!/bin/bash
ZIPFILE="Tell-darwin.zip"
VERSION=`grep version package.json | cut -d\" -f4`
echo "Deploying version ${VERSION} ..."

cd release/darwin-x64/Tell-darwin-x64/
echo -n "${VERSION}" > version.txt
zip -qyr ${ZIPFILE} Tell.app

scp ${ZIPFILE} version.txt koyanoa@elnath.uberspace.de:/var/www/virtual/koyanoa/html/beta/
