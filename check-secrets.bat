@echo off
echo.
echo ========================================
echo   SECRET SCANNER - BikeHub Project
echo ========================================
echo.
echo Scanning for exposed secrets...
echo.

cd /d "%~dp0"

echo [1/3] Checking if .env files are properly ignored...
git check-ignore backend\.env frontend\.env 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: .env files might not be ignored by Git!
    echo Run: git status
) else (
    echo OK: .env files are ignored
)
echo.

echo [2/3] Checking git status for .env files...
git status 2>nul | findstr /C:".env" >nul
if %ERRORLEVEL% EQU 0 (
    echo ERROR: .env files are staged for commit!
    echo Run: git reset backend\.env frontend\.env
) else (
    echo OK: No .env files in git staging
)
echo.

echo [3/3] Checking for secrets in committed files...
git ls-files 2>nul | findstr /C:".env" >nul
if %ERRORLEVEL% EQU 0 (
    echo ERROR: .env files are tracked by git!
    echo You must remove them: git rm --cached backend\.env frontend\.env
) else (
    echo OK: No .env files tracked by git
)
echo.

echo ========================================
echo   MANUAL CHECKS REQUIRED:
echo ========================================
echo.
echo 1. Have you changed your MongoDB password?
echo 2. Have you generated a new JWT secret?
echo 3. Check SECURITY_CHECKLIST.md for full list
echo.
echo If all checks passed, you're safe to push!
echo.
pause
