import React, { useState } from 'react';
import Menu from './Menu';
import OrderTable from './OrderTable';
import OrderForm from './OrderForm';
import axios from "axios";

const Home = () => {
    const [order, setOrder] = useState({ selectedItems: [], quantities: [], total: 0 });
    const [formData, setFormData] = useState(null);
    const [isOrderUpdated, setIsOrderUpdated] = useState(false);

    const addToOrder = (selectedItems, quantities, total, isUpdate) => {
        if (isUpdate) {
            // If updating the order, update state and set the flag
            setOrder({ selectedItems, quantities, total });
            setIsOrderUpdated(true);
        } else {
            // If it's a new order, update state
            setOrder({ selectedItems, quantities, total });
        }
    };

    const submitForm = async (data) => {
        setFormData(data);
        try {            
            const filteredQuantities = order.quantities.filter(quantity => quantity !== 0);
            // Create payload for order.json
            const payload = {
                name: data.name,
                phone: data.phone,
                location: data.isOnsite ? data.tableNumber : data.location,
                table: data.isOnsite ? data.tableNumber : null,
                total: order.total,
                orders: order.selectedItems.map((item, index) => ({
                  name: item.name,
                  quantity: filteredQuantities[index],
                })),
              };

            // Make POST request to user.json
            await axios.post('http://localhost:5000/api/orders', payload);
            console.log('Order submitted successfully!');
            alert('Order submitted successfully!');
            window.location.reload();
        
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div>
        <Menu addToOrder={addToOrder} />
        <OrderTable {...order} formData={formData} isOrderUpdated={isOrderUpdated} />
        <OrderForm onSubmit={submitForm} />
        </div>
    );
};

export default Home;