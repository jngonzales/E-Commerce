@echo off
echo Starting Bike Shop E-Commerce Platform...
echo.

REM Start Backend Server
echo [1/2] Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

REM Wait a moment for backend to initialize
ping 127.0.0.1 -n 4 >nul

REM Start Frontend Server
echo [2/2] Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo   Bike Shop is starting up!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Opening website in 2 seconds...
ping 127.0.0.1 -n 3 >nul

REM Open browser
start http://localhost:5173

echo.
echo Both servers are running in separate windows.
echo Close those windows to stop the servers.
echo.
