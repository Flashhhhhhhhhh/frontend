#!/bin/bash

echo "Running 'npm run build'..."
eval npm run build > /dev/null
echo "Copying files to production server..."
eval scp -r -i ~/Documents/dev/flash/flashKeyPair.pem  build/* ec2-user@ec2-52-87-177-238.compute-1.amazonaws.com:/var/www/html/ > /dev/null
echo "Cleaning up build process..."
eval git checkout .
eval git clean -f
