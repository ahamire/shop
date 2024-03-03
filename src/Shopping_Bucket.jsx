// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

const Bucket = () => {
  const [storedList, setStoredList] = useState(JSON.parse(localStorage.getItem('list')) || []);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleCheckout = () => {
    // Операції для оформлення замовлення
    // Наприклад, надсилання даних на сервер, очищення корзини тощо
    if (storedList.length!=0){
    alert("succesfull");
    }
    // Після успішного оформлення замовлення можна очистити корзину:
    setStoredList([]);
    localStorage.removeItem('list');
  
    // Додати інші дії після оформлення замовлення, якщо потрібно
  };
  useEffect(() => {
    let total = 0;
    storedList.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [storedList]);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedList = [...storedList];
    updatedList[index].quantity = newQuantity;
    setStoredList(updatedList);
    localStorage.setItem('list', JSON.stringify(updatedList));
  };

  const handleRemoveItem = (index) => {
    const updatedList = storedList.filter((_, i) => i !== index);
    setStoredList(updatedList);
    localStorage.setItem('list', JSON.stringify(updatedList));
  };

  return (
    <div className="py-10">
      <div className="h-20 flex justify-center">
        <h1 className="text-3xl">Your Shopping Cart</h1>
      </div>
      <div className="bg-lime-600 p-20">
        {storedList.map((item, index) => (
          <div key={index} className="mb-4">
            <h3>{item.name}</h3>
            <img src={item.background_image} alt="" className="w-48" />
            <p>Price: {item.price}</p>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
              min="1"
              className="mr-2 border border-gray-300 rounded-md px-2 py-1"
            />
            {/* Додано кнопку для видалення товару */}
            <button onClick={() => handleRemoveItem(index)} className="bg-red-400 rounded px-2 py-1">
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center py-2">
        <h1 className="px-10 text-3xl">${totalPrice}</h1>
        <button className="bg-lime-400 hover:bg-lime-300 rounded-full px-4 py-2 active:bg-lime-400 focus:outline-none focus:ring focus:ring-lime-400" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Bucket;
