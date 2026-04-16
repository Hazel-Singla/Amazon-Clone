@echo off
echo ====================================
echo Adding Email Column to Orders Table
echo ====================================
echo.
echo This will add the customerEmail column to your orders table.
echo.
echo Please enter your MySQL root password when prompted.
echo.
pause

mysql -u root -p amazon_clone < database\migrate_email.sql

echo.
echo ====================================
echo Migration Complete!
echo ====================================
echo.
pause
