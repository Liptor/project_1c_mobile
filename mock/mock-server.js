const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/ut_api/hs/v1/catalog', (req, res) => {
  res.json([
    { id: '1111-2222-3333', name: 'Цемент М500 (50 кг)', article: 'CEM-500' },
    { id: '4444-5555-6666', name: 'Арматура А500С 12мм', article: 'ARM-12' },
    { id: '7777-8888-9999', name: 'Кирпич облицовочный', article: 'BRK-01' }
  ]);
});

app.post('/ut_api/hs/v1/orders', (req, res) => {
  console.log('Прилетел заказ из мобилки:', req.body);
  res.json({
    status: 'created',
    orderId: '9999-0000-1111',
    orderNumber: '0000-00124'
  });
});

app.listen(3000, () => {
  console.log('Mock 1C server запущен на http://localhost:3000');
});
