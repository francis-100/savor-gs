import React, {useState, useEffect } from 'react';
import axios from "axios";

function Inventory() {
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState("");
    const [newPrice, setNewPrice] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/inventory');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/inventory/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const addItem = async () => {
        try {
            const newItem = {
                name: newItemName,
                price: parseInt(newPrice, 10),
            };

            await axios.post('http://localhost:5000/api/inventory', newItem);

            fetchData();
            setNewItemName('');
            setNewPrice('');
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleNewItemChange = (event) => {
        setNewItemName(event.target.value);
    };

    const handleNewPriceChange = (event) => {
        setNewPrice(event.target.value);
    };

    return (
        <div>
            <h2>Inventory</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{typeof item.price === 'number' ? `Ksh. ${item.price.toFixed(2)}` : 'Invalid Price'}</td>
                        <td>
                            <button onClick={() => deleteItem(item.id)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <label htmlFor="itemName">Item Name:</label>
                <input
                    type="text"
                    id="itemName"
                    value={newItemName}
                    onChange={handleNewItemChange}
                />
                <label htmlFor="itemPrice">Item Price:</label>
                <input
                    type="number"
                    id="itemPrice"
                    value={newPrice}
                    onChange={handleNewPriceChange}
                />
                <button onClick={addItem}>Add Item</button>
            </div>
        </div>
    );
}

export default Inventory;
