#!/bin/bash
HOST='koyanoa@elnath.uberspace.de'
DIR='/var/www/virtual/koyanoa/html/beta'
VERSION=`grep version package.json | cut -d\" -f4`
echo "Publishing ${VERSION} to ${HOST} ..."

cd dist
echo -n "${VERSION}" > version.txt
ssh ${HOST} "rm ${DIR}/*"

TARGET="${HOST}:${DIR}"
scp version.txt ${TARGET}
scp "mac/Tell-${VERSION}.dmg" ${TARGET}
scp "Tell-${VERSION}-win.zip" ${TARGET}
