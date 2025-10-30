# ShopHub Quick Start Script
# This script checks MongoDB connection and seeds the database

Write-Host "🚀 ShopHub Quick Start" -ForegroundColor Cyan
Write-Host "=====================`n" -ForegroundColor Cyan

# Check if MongoDB is running
Write-Host "📊 Checking MongoDB connection..." -ForegroundColor Yellow

$mongoRunning = $false
try {
    # Try to connect to MongoDB
    & mongosh --eval "db.adminCommand('ping')" --quiet 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        $mongoRunning = $true
        Write-Host "✅ MongoDB is running!" -ForegroundColor Green
    }
} catch {
    $mongoRunning = $false
}

if (-not $mongoRunning) {
    Write-Host "❌ MongoDB is not running or not installed" -ForegroundColor Red
    Write-Host "`n📚 Please follow these steps:" -ForegroundColor Yellow
    Write-Host "1. Read MONGODB_SETUP.md for installation instructions" -ForegroundColor White
    Write-Host "2. Choose one of the three options:" -ForegroundColor White
    Write-Host "   - Install MongoDB locally (recommended)" -ForegroundColor White
    Write-Host "   - Use Docker" -ForegroundColor White
    Write-Host "   - Use MongoDB Atlas (cloud)" -ForegroundColor White
    Write-Host "`n3. Once MongoDB is running, run this script again" -ForegroundColor White
    Write-Host "`nOpening MONGODB_SETUP.md..." -ForegroundColor Cyan
    Start-Process "MONGODB_SETUP.md"
    exit 1
}

# MongoDB is running, proceed with seeding
Write-Host "`n🌱 Seeding database..." -ForegroundColor Yellow
Set-Location backend
npm run seed

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Database seeded successfully!" -ForegroundColor Green
    Write-Host "`n🎉 ShopHub is ready!" -ForegroundColor Cyan
    Write-Host "=====================`n" -ForegroundColor Cyan
    
    Write-Host "👤 Admin Credentials:" -ForegroundColor Yellow
    Write-Host "   Email: admin@example.com" -ForegroundColor White
    Write-Host "   Password: admin123" -ForegroundColor White
    
    Write-Host "`n🚀 Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Backend is already running at http://localhost:5000" -ForegroundColor White
    Write-Host "2. Frontend is already running at http://localhost:5173" -ForegroundColor White
    Write-Host "3. Open http://localhost:5173 in your browser" -ForegroundColor White
    Write-Host "4. Login as admin or create a new account" -ForegroundColor White
    Write-Host "5. Start shopping! 🛍️" -ForegroundColor White
    
    Write-Host "`n📖 For complete feature guide, see FEATURES_GUIDE.md" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Failed to seed database" -ForegroundColor Red
    Write-Host "Check the error messages above and try again" -ForegroundColor Yellow
}

Set-Location ..
