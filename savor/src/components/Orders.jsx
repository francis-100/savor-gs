import React, { useState, useEffect } from 'react';
import axios from "axios";

function Orders() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/orders');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    return (
        <div className="bg-zinc-950 max-w-xl mx-auto mt-9 p-4 rounded-md shadow-md">
            <h2 className="text-white text-left mt-9 mb-9">ORDERS</h2>
            <div className="overflow-x-auto">
                <table className="w-auto border-collapse border border-gold">
                    <thead>
                        <tr className="bg-gold text-white">
                            <th className="p-2 border border-gold">Name</th>
                            <th className="p-2 border border-gold">Phone</th>
                            <th className="p-2 border border-gold">Location</th>
                            <th className="p-2 border border-gold">Table</th>
                            <th className="p-2 border border-gold">Total</th>
                            <th className="p-2 border border-gold">Orders</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((order) => (
                            <tr key={order.id} className="bg-zinc-900 text-white">
                                <td className="p-2 border border-gold">{order.name}</td>
                                <td className="p-2 border border-gold">{order.phone}</td>
                                <td className="p-2 border border-gold">{order.location}</td>
                                <td className="p-2 border border-gold">{order.table || 'N/A'}</td>
                                <td className="p-2 border border-gold">{typeof order.total === 'number' ? `Ksh. ${order.total.toFixed(2)}` : 'Invalid Price'}</td>
                                <td className="p-2 border border-gold">
                                    <ul>
                                        {order.orders.map((item, index) => (
                                            <li key={index}>{item.name}: {item.quantity}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;