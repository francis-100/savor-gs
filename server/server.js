const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

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

app.post('/api/inventory', async (req, res) => {
  try {
    const data = await fs.readFile('./files/inventory.json', 'utf-8');
    const currentData = JSON.parse(data);

    const newItem = {
      id: currentData.length + 1,
      name: req.body.name,
      price: parseInt(req.body.price, 10),
    };

    currentData.push(newItem);

    await fs.writeFile('./files/inventory.json', JSON.stringify(currentData, null, 2));
    res.json({ message: 'Item added successfully' });
  } catch (error) {
    console.error('Error adding item:', error);
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
