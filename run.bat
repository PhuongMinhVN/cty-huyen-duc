@echo off
title HuyenDuc Web Server (Port 3009)
color 0A

echo Dang kiem tra va giai phong cong 3009 (Neu dang bi chiem)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3009" ^| findstr "LISTENING"') do (
    echo Dang tat tien trinh PID %%a dang chiem cong 3009...
    taskkill /F /PID %%a 2>nul
)

echo.
echo ===================================================
echo     MAY CHU WEB - CONG TY TNHH MTV HUYEN DUC
echo ===================================================
echo.
echo Dang khoi dong he thong...
echo.
echo Website se chay tai dia chi:
echo - Chay tren may nay: http://localhost:3009
echo - Chay qua LAN/Cloudflare: http://192.168.89.8:3009
echo.
echo (De dung trang web, hay tat cua so nay)
echo ===================================================
echo.
node server.js
pause
