#!/bin/bash
VERSION=`grep version package.json | cut -d\" -f4`
DMGFILE="Tell-${VERSION}.dmg"
echo "Publishing ${DMGFILE} ..."

cd dist/mac
echo -n "${VERSION}" > version.txt

scp ${DMGFILE} koyanoa@elnath.uberspace.de:/var/www/virtual/koyanoa/html/beta/Tell-mac.dmg
scp version.txt koyanoa@elnath.uberspace.de:/var/www/virtual/koyanoa/html/beta/
