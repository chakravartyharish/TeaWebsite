@echo off
setlocal
cd /d %~dp0\..\..
cd apps\backend
python -m venv .venv
call .venv\Scripts\activate
pip install -r requirements.txt
if not exist .env (
  if exist env.example (
    copy env.example .env >nul
  ) else (
    echo Missing env.example. Please create apps\backend\.env manually.
  )
)
echo Backend ready. Activate venv with: call apps\backend\.venv\Scripts\activate
endlocal

