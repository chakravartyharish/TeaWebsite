@echo off
setlocal
cd /d %~dp0\..\..
docker compose up --build
endlocal

