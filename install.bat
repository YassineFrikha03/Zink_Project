@echo off
title Zink Project - Installation Automatique
color 0A

echo.
echo  ================================================
echo   ZINK BURGER - Installation Automatique
echo  ================================================
echo.

:: ---- Verifier Node.js ----
echo [1/5] Verification de Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERREUR] Node.js n'est pas installe !
    echo Telecharge Node.js sur : https://nodejs.org
    echo Installe-le puis relance ce script.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node -v') do echo [OK] Node.js %%i detecte
)

:: ---- Verifier Git ----
echo.
echo [2/5] Verification de Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERREUR] Git n'est pas installe !
    echo Telecharge Git sur : https://git-scm.com/download/win
    echo Installe-le puis relance ce script.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('git --version') do echo [OK] %%i detecte
)

:: ---- Creer le fichier .env ----
echo.
echo [3/5] Creation du fichier .env du backend...
if not exist "restaurant-backend\.env" (
    (
        echo PORT=5000
        echo MONGO_URI=mongodb://localhost:27017/zink_db
        echo JWT_SECRET=zink_secret_key_2024
    ) > restaurant-backend\.env
    echo [OK] Fichier .env cree dans restaurant-backend/
) else (
    echo [OK] Fichier .env deja existant
)

:: ---- Installer Backend ----
echo.
echo [4/5] Installation des dependances BACKEND...
cd restaurant-backend
call npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo [WARN] Tentative avec --force...
    call npm install --force
)
echo [OK] Backend installe !
cd ..

:: ---- Installer Frontend ----
echo.
echo [5/5] Installation des dependances FRONTEND...
cd restaurant-frontend
call npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo [WARN] Tentative avec --force...
    call npm install --force
)
echo [OK] Frontend installe !
cd ..

:: ---- Fin ----
echo.
echo  ================================================
echo   Installation terminee avec succes !
echo  ================================================
echo.
echo  Pour lancer le projet :
echo.
echo   Terminal 1 (Backend) :
echo     cd restaurant-backend
echo     npm run dev
echo.
echo   Terminal 2 (Frontend) :
echo     cd restaurant-frontend
echo     npm run dev
echo.
echo   Puis ouvrir : http://localhost:5173
echo.
pause
