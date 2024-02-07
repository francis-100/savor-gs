const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/inventory', async (req, res) => {
  try {
    const data = await fs.readFile('./files/inventory.json', 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const data = await fs.readFile('./files/orders.json', 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/inventory', async (req, res) => {
  try {
    const data = await fs.readFile('./files/inventory.json', 'utf-8');
    const currentData = JSON.parse(data);

    const newItem = {
      id: uuidv4(),
      name: req.body.name,
      price: parseInt(req.body.price, 10),
      category: req.body.category,
    };  

    currentData.push(newItem);

    await fs.writeFile('./files/inventory.json', JSON.stringify(currentData, null, 2));
    res.json({ message: 'Item added successfully' });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const orderData = await fs.readFile('./files/orders.json', 'utf-8');
    const orders = JSON.parse(orderData);

    const order = {
      id : uuidv4(),
      name: req.body.name,
      phone: req.body.phone,
      location: req.body.location,
      table: req.body.table,
      total: req.body.total,
      orders: req.body.orders,
    };

    orders.push(order);

    await fs.writeFile('./files/orders.json', JSON.stringify(orders, null, 2));

    res.status(200).json({ message: 'Order added successfully' });
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/inventory/:id', async (req, res) => {
  try {
    const data = await fs.readFile('./files/inventory.json', 'utf-8');
    let currentData = JSON.parse(data);

    currentData = currentData.filter((item) => item.id !== parseInt(req.params.id));

    await fs.writeFile('./files/inventory.json', JSON.stringify(currentData, null, 2));
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
