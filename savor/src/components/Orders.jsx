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
        <div>
            <h2>Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Table</th>
                        <th>Total</th>
                        <th>Orders</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((order) => (
                        <tr key={order.id}>
                            <td>{order.name}</td>
                            <td>{order.phone}</td>
                            <td>{order.location}</td>
                            <td>{order.table || 'N/A'}</td>
                            <td>{typeof order.total === 'number' ? `Ksh. ${order.total.toFixed(2)}` : 'Invalid Price'}</td>
                            <td>
                                <ul>
                                    {order.orders.map((item, index) => (
                                        <li key={index}>
                                            {item.name}: {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Orders;