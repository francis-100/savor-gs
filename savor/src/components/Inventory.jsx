import React, {useState, useEffect } from 'react';
import axios from "axios";

function Inventory() {
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newCategory, setNewCategory] = useState("");

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
                category: newCategory,
            };

            await axios.post('http://localhost:5000/api/inventory', newItem);

            fetchData();
            setNewItemName('');
            setNewPrice('');
            setNewCategory('');
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

    const handleNewCategoryChange = (event) => {
        setNewCategory(event.target.value);
    };

    return (
        <div>
            <div className="bg-zinc-950 max-w-xl mx-auto mt-0 p-4 rounded-md shadow-md">
            <h1 className="text-white text-left mt-9 mb-9">INVENTORY</h1>
                <table className="table-fixed">
                    <thead>
                        <tr className="bg-gold text-white">
                            <th className="p-2 ">Name</th>
                            <th className="p-2 ">Price</th>
                            <th className="p-2 ">Category</th>
                            <th className="p-2 ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="bg-zinc-900 text-white">
                                <td className="p-2 border">{item.name}</td>
                                <td className="p-2 border">{typeof item.price === 'number' ? `Ksh. ${item.price.toFixed(2)}` : 'Invalid Price'}</td>
                                <td className="p-2 border">{item.category}</td>
                                <td className="p-2 border">
                                    <button onClick={() => deleteItem(item.id)} className="bg-amber-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:shadow-outline">
                                        delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-zinc-950 max-w-xl text-left mx-auto mt-9 p-4 rounded-md shadow-md content-left">
            <h1 className="text-white text-left mt-9 mb-9">ADD FOOD</h1>
                <label htmlFor="itemName" className="text-white">Food Name</label>
                <input
                    type="text"
                    id="itemName"
                    value={newItemName}
                    onChange={handleNewItemChange}
                    className="block border border-amber-300 p-1 text-black rounded-md mb-2"
                />
                <label htmlFor="itemPrice" className="text-white">Food Price</label>
                <input
                    type="number"
                    id="itemPrice"
                    value={newPrice}
                    onChange={handleNewPriceChange}
                    className="block border border-amber-300 p-1 text-black rounded-md mb-2"
                />
                <label htmlFor="itemCategory" className="text-white">Food Category</label>
                <select
                    type="text"
                    id="itemCategory"
                    value={newCategory}
                    onChange={handleNewCategoryChange}
                    required
                    className="block border border-amber-300 p-1 text-black rounded-md mb-2"
                >
                    <option value="" disabled hidden>Select Category</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Dessert">Dessert</option>
                </select>
                <button onClick={addItem} className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:shadow-outline">
                    ADD
                </button>
            </div>
        </div>
    );
};

export default Inventory;
