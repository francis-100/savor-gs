import React, { useState, useEffect } from 'react';
import axios from "axios";

const Menu = ({ addToOrder }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Specials');
    const [isOrderUpdated, setIsOrderUpdated] = useState(false);
    const [existingItems, setExistingItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/inventory');
            setMenuItems(response.data.map(item => ({ ...item, id: item.id})));
            setQuantities(Array(response.data.length).fill(0));
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const handleIncrease = (index) => {
        const newQuantities = [...quantities];
        newQuantities[index]++;
        setQuantities(newQuantities);
    };

    const handleDecrease = (index) => {
        const newQuantities = [...quantities];
        if (newQuantities[index] > 0) {
        newQuantities[index]--;
        }
        setQuantities(newQuantities);
    };

    const calculateTotal = () => {
        return menuItems.reduce((total, item, index) => {
        return total + item.price * quantities[index];
        }, 0);
    };

    const addToOrderHandler = () => {
        const selectedItems = menuItems
        .filter((item, index) => quantities[index] > 0 && (selectedCategory === 'Specials' || item.category === selectedCategory));
    
        // If the order is being updated, merge the current and new selected items
        const mergedItems = isOrderUpdated ? [...selectedItems, ...existingItems] : selectedItems;
    
        addToOrder(mergedItems, [...quantities], calculateTotal());
    };
    
    
    // Extract unique categories from menuItems
    const categories = ['Specials', ...new Set(menuItems.map((item) => item.category))];
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Select Category:
        </label>
        <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mb-4 border rounded-md p-2"
        >
            {categories.map((category, categoryIndex) => (
            <option key={categoryIndex} value={category}>
                {category}
            </option>
            ))}
        </select>
        <ul>
            {menuItems
            .filter((item) => selectedCategory === 'Specials' || item.category === selectedCategory)
            .map((item, index) => (
                <li key={index} className="flex items-center justify-between mb-2 border-b pb-2">
                <span className="text-lg">
                    {item.name} - Ksh. {item.price}
                </span>
                <div className="flex items-center">
                    <button
                    type="button"
                    onClick={() => handleIncrease(index)}
                    className="mr-2 bg-blue-500 text-white px-3 py-1 rounded"
                    >
                    +
                    </button>
                    <span className="font-bold">{quantities[index]}</span>
                    <button
                    type="button"
                    onClick={() => handleDecrease(index)}
                    className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
                    >
                    -
                    </button>
                </div>
                </li>
            ))}
        </ul>
        <button type="button" onClick={addToOrderHandler} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
            Submit Order
        </button>
        </div>
    );
};

export default Menu;
