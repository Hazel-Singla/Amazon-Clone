@echo off
echo ====================================
echo Amazon Clone - Database Setup
echo ====================================
echo.

echo Step 1: Creating database and tables...
mysql -u root -p < backend\database\schema.sql

if %errorlevel% neq 0 (
    echo ERROR: Failed to create database. Please check MySQL connection.
    pause
    exit /b 1
)

echo.
echo Step 2: Database created successfully!
echo.
echo Next steps:
echo 1. Update backend\.env with your MySQL password
echo 2. Run: cd backend ^&^& npm run seed
echo 3. Run: cd backend ^&^& npm run dev
echo 4. In new terminal: cd frontend ^&^& npm run dev
echo.
pause
