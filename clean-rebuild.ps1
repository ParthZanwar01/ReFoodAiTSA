# Stop all running dev servers before running this script!

Write-Host "Cleaning .next, node_modules, and lockfile..."
if (Test-Path .next) { Remove-Item -Recurse -Force .next }
if (Test-Path node_modules) { Remove-Item -Recurse -Force node_modules }
if (Test-Path package-lock.json) { Remove-Item -Force package-lock.json }

Write-Host "Reinstalling dependencies..."
npm install

Write-Host "Building the project..."
npm run build

Write-Host "Starting the production server..."
npm start 