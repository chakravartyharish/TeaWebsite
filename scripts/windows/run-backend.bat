@echo off
setlocal
cd /d %~dp0\..\..
cd apps\backend
call .venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
endlocal

