#!/bin/sh
set -e

# Install dependencies if node_modules doesn't exist or package.json changed
if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo "Dependencies installed"
fi

exec "$@"
