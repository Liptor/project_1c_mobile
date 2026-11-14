const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let catalog = [
  {
    "localId": "a1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c",
    "status": "synced",
    "item": {
      "name": "Вентилятор напольный Vitek VT-1901",
      "article": "VT-1901"
    }
  },
  {
    "localId": "b2c3d4e5-f6a7-48b9-0c1d-2e3f4a5b6c7d",
    "status": "synced",
    "item": {
      "name": "Холодильник Bosch KGN39VL316",
      "article": "KGN39VL316"
    }
  },
  {
    "localId": "c3d4e5f6-a7b8-49c0-1d2e-3f4a5b6c7d8e",
    "status": "synced",
    "item": {
      "name": "Стиральная машина LG F2J3HS0W",
      "article": "F2J3HS0W"
    }
  },
  {
    "localId": "d4e5f6a7-b8c9-40d1-2e3f-4a5b6c7d8e9f",
    "status": "synced",
    "item": {
      "name": "Кофемашина DeLonghi Magnifica S ECAM 22.110.B",
      "article": "ECAM-22110"
    }
  },
  {
    "localId": "e5f6a7b8-c9d0-41e2-3f4a-5b6c7d8e9f0a",
    "status": "synced",
    "item": {
      "name": "Пылесос Samsung VC18M21A0SB",
      "article": "VC18M21A0SB"
    }
  }
]

app.get('/ut_api/hs/v1/catalog', (req, res) => {
  return res.json(catalog);
});

const processedOrderIds = new Set();

app.post('/ut_api/hs/v1/orders', (req, res) => {
  const { localId } = req.body;

  if (localId && processedOrderIds.has(localId)) {
    return res.status(200).json({ 
      status: 'already_processed', 
      localId 
    });
  }

  if (localId) {
    processedOrderIds.add(localId);
  }

  catalog.push(req.body);
  res.json({
    status: 'created',
    item: req.body
  });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Mock 1C server запущен на http://localhost:3000');
});
