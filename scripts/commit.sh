#!/usr/bin/env bash

msg=$1

if [[ -n "$msg" ]]; then
    npm run build
    git add .
    git ca "$msg"
    git p
    echo "Pushed"
else
    echo "Commit message not provided"
fi
