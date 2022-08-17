#!/usr/bin/env bash

pushd /home/ubuntu/eco-api

# todo: init project

echo 'stash git'
git stash

echo 'checkout develop'
git checkout develop
git pull origin

echo 'remove old build'
npm run prebuild
rm -rf node_modules
rm package-lock.json

echo 'install packages'
npm install
echo 'restart server'
pm2 reload ecosystem.config.js

popd
