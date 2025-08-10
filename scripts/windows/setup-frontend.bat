@echo off
setlocal
cd /d %~dp0\..\..
cd apps\frontend
if exist pnpm-lock.yaml (
  pnpm i
) else (
  if exist yarn.lock (
    yarn
  ) else (
    npm i
  )
)
if not exist .env.local copy env.local.example .env.local
echo Frontend ready.
endlocal

