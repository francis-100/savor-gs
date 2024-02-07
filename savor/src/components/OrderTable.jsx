// src/components/OrderTable.jsx
import React, { useEffect, useState } from 'react';

const OrderTable = ({ selectedItems, quantities, total, formData, isOrderUpdated }) => {
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setIsUpdate(isOrderUpdated);
  }, [isOrderUpdated]);

  const filteredQuantities = quantities.filter(quantity => quantity !== 0);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">{isUpdate ? 'Order Updated' : 'Your Order'}</h2>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Food</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((item, index) => {
            return (
              <tr key={index} className="border-t">
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{filteredQuantities[index]}</td>
                <td className="border px-4 py-2">Ksh. {item.price}</td>
                <td className="border px-4 py-2">Ksh. {item.price * filteredQuantities[index]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-xl font-bold">Total: Ksh. {total}</p>
    </div>
  );
};

export default OrderTable;
