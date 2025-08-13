@echo off
setlocal
cd /d %~dp0\..\..
cd apps\frontend
npm run dev
endlocal

