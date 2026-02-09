#!/bin/sh
set -e

# Run seed script to initialize DB with sample data
echo "🌱 Seeding database..."
npx tsx scripts/seed.ts 2>/dev/null || echo "⚠️ Seed skipped (may already exist)"

echo "🚀 Starting Trand Forty..."
exec "$@"
