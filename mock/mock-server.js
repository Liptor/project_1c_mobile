const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let catalog = [
      {
        "id": "a1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c",
        "name": "Вентилятор напольный Vitek VT-1901",
        "article": "VT-1901"
      },
      {
        "id": "b2c3d4e5-f6a7-48b9-0c1d-2e3f4a5b6c7d",
        "name": "Холодильник Bosch KGN39VL316",
        "article": "KGN39VL316"
      },
      {
        "id": "c3d4e5f6-a7b8-49c0-1d2e-3f4a5b6c7d8e",
        "name": "Стиральная машина LG F2J3HS0W",
        "article": "F2J3HS0W"
      },
      {
        "id": "d4e5f6a7-b8c9-40d1-2e3f-4a5b6c7d8e9f",
        "name": "Кофемашина DeLonghi Magnifica S ECAM 22.110.B",
        "article": "ECAM-22110"
      },
      {
        "id": "e5f6a7b8-c9d0-41e2-3f4a-5b6c7d8e9f0a",
        "name": "Пылесос Samsung VC18M21A0SB",
        "article": "VC18M21A0SB"
      }
  ]

app.get('/ut_api/hs/v1/catalog', (req, res) => {
  return res.json(catalog);
});

app.post('/ut_api/hs/v1/orders', (req, res) => {
  const newItem = {
    id: `item-${Date.now()}`,
    name: req.body.name || "Без названия",
    article: req.body.article || "NO-ART"
  }

  catalog.push(newItem);
  res.json({
    status: 'created',
    item: newItem
  });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Mock 1C server запущен на http://localhost:3000');
});
