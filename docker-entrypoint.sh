#!/bin/sh
set -e

echo "🌱 Seeding database..."
npx tsx scripts/seed.ts || echo "⚠️ Seed skipped (may already exist)"

echo "🚀 Starting Trand Forty..."
exec "$@"
