import React, {useState, useEffect } from 'react';
import data from "./files/inventory.json";

function Inventory() {
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState("");
    const [newPrice, setNewPrice] = useState("");

    useEffect(() => {
        setItems(data);
    }, []);

    const deleteItem = (id) => {
        const newItems = items.filter((item) => item.id !== id);
        setItems(newItems);
    };

    const addItem = () => {
        const newItem = { id: items.length + 1, name: newItemName, price: newPrice };
        setItems([...items, newItem]);
        setNewItemName("");
        setNewPrice("");
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
                        <td>{item.name}</td>
                        <td>Ksh. {item.price.toFixed(2)}</td>
                        <td><button onClick={() => deleteItem(item.id)}>Delete</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <input type="text" value={newItemName} onChange={handleNewItemChange} />
                <input type="number" value={newPrice} onChange={handleNewPriceChange} />
                <button onClick={addItem}>Add Item</button>
            </div>
        </div>
    );
}

export default Inventory;