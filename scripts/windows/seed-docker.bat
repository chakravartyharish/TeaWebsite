@echo off
setlocal
cd /d %~dp0\..\..
docker compose exec backend bash -lc "python -c 'from app.core.db import Base, engine; Base.metadata.create_all(engine)'"
docker compose exec backend bash -lc "python -m app.scripts.seed"
endlocal

