up: 
	docker compose up --build

seed: 
	docker compose exec backend bash -lc "python -m app.scripts.seed"

fmt:
	@echo "No formatter configured yet"

