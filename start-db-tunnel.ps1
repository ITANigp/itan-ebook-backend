# SSH Tunnel Script for RDS Database Access
# This creates an SSH tunnel through the EC2 proxy to access the RDS database

# Configuration
$EC2_PUBLIC_IP = "34.243.242.210"  # EC2 Proxy Server Public IP
$SSH_KEY = "itan-proxy-key.pem"
$RDS_ENDPOINT = "itan.c7eqcqy2akaj.eu-west-1.rds.amazonaws.com"
$LOCAL_PORT = 5433  # Changed from 5432 to avoid conflict
$REMOTE_PORT = 5432

Write-Host "🔐 Starting SSH tunnel to RDS database..." -ForegroundColor Cyan
Write-Host "Local port: $LOCAL_PORT" -ForegroundColor Yellow
Write-Host "Remote: ${RDS_ENDPOINT}:${REMOTE_PORT}" -ForegroundColor Yellow
Write-Host "Proxy: ubuntu@${EC2_PUBLIC_IP}" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  Keep this window open while using the database" -ForegroundColor Red
Write-Host "Press Ctrl+C to stop the tunnel" -ForegroundColor Red
Write-Host ""

# Create SSH tunnel
ssh -i $SSH_KEY `
    -L "${LOCAL_PORT}:${RDS_ENDPOINT}:${REMOTE_PORT}" `
    -N `
    ubuntu@$EC2_PUBLIC_IP

Write-Host "`n❌ Tunnel closed" -ForegroundColor Red
