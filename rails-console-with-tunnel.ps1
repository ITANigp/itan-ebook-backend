# Rails Console with Database Tunnel
# Run this AFTER starting the SSH tunnel in another terminal

Write-Host "🚂 Starting Rails Console (Production)" -ForegroundColor Cyan
Write-Host "Make sure the SSH tunnel is running in another terminal!" -ForegroundColor Yellow
Write-Host ""

# Set DATABASE_URL to use localhost (through the SSH tunnel)
$env:DATABASE_URL = "postgresql://postgres:KogXAn98rqPduW3pRKN1@localhost:5433/Itandb"
$env:RAILS_ENV = "production"

# Start Rails console
bundle exec rails console
