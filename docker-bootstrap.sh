#!/bin/sh

npx prisma db push --skip-generate

node server.js