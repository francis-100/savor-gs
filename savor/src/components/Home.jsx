
// import Navbar from './Navbar';
// import Footer from './Footer';
import React, { useState } from 'react';
import Menu from './Menu';
import OrderTable from './OrderTable';
import OrderForm from './OrderForm';

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

  const submitForm = (data) => {
    setFormData(data);
  };

  return (
    <div>
      <Menu addToOrder={addToOrder} />
      <OrderForm onSubmit={submitForm} />
      <OrderTable {...order} formData={formData} isOrderUpdated={isOrderUpdated} />
    </div>
  );
};

export default Home;