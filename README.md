## Cборка образа
```bash
docker build . -t thermopol
```

## Запуск контейнера
```bash
docker run -v ${pwd}:/usr/src -p 8000:8000 thermopol
```
