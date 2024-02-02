import React, {useState, useEffect } from 'react';
import data from "./files/inventory.json";

function Inventory() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(data);
    }, []);

    const deleteItem = (id) => {
        const newItems = items.filter((item) => item.id !== id);
        setItems(newItems);
    };

    const addItem = () => {
        const newItem = { id: items.length + 1, name: `Item ${items.length + 1}` };
        setItems([...items, newItem]);
    };

    return (
        <div>
            {items.map((item) => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <button onClick={() => deleteItem(item.id)}>Delete</button>
                </div>
            ))}
            <button onClick={addItem}> Add Item</button>
        </div>
    )
}

export default Inventory;