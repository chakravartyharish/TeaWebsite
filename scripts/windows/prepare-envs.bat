@echo off
setlocal
cd /d %~dp0\..\..

REM Backend env
if exist apps\backend\env.example (
  if not exist apps\backend\.env copy apps\backend\env.example apps\backend\.env >nul
) else (
  echo apps\backend\env.example not found. Create apps\backend\.env manually.
)

REM Frontend env
if exist apps\frontend\env.local.example (
  if not exist apps\frontend\.env.local copy apps\frontend\env.local.example apps\frontend\.env.local >nul
) else (
  echo apps\frontend\env.local.example not found. Create apps\frontend\.env.local manually.
)

echo Env files prepared.
endlocal

