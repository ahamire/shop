import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

class GameDetails {
  constructor(game, quantity = 1) {
    this.background_image = game ? game.background_image : '';
    this.name = game ? game.name : '';
    this.price = localStorage.getItem('price') || '';
    this.quantity = quantity; // Додали поле quantity
  }
}

const Game = () => {
  const [gameDetails, setGameDetails] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1); // Додали стейт для кількості товару

  const apikey = 'e3f6260344114b29b9e9340683a86d41';
  const { id } = useParams();
  const url = `https://api.rawg.io/api/games/${id}?key=${apikey}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setGameDetails(result);
          setSelectedGame(result);
        },
        (error) => {
          console.error('Error fetching game details:', error);
        }
      );
  }, [url]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(value);
    }
  };

  const handleBuyButtonClick = () => {
    if (selectedGame) {
      const newGame = new GameDetails(selectedGame, quantity);
  
      // Перевірка, чи такий товар вже є в корзині
      const existingIndex = product.findIndex(
        (item) => item.name === newGame.name && item.price === newGame.price
      );
  
      if (existingIndex !== -1) {
        // Якщо товар вже є, збільшуємо кількість, а не додаємо новий екземпляр
        const updatedProduct = [...product];
        updatedProduct[existingIndex].quantity += quantity;
        setProduct(updatedProduct);
      } else {
        // Якщо товару немає в корзині, додаємо його
        const updatedProduct = [...product, newGame];
        setProduct(updatedProduct);
      }
  
      // Оновлення localStorage
      const storedList = JSON.parse(localStorage.getItem('list')) || [];
      const existingStoredIndex = storedList.findIndex(
        (item) => item.name === newGame.name && item.price === newGame.price
      );
  
      if (existingStoredIndex !== -1) {
        const updatedStoredList = [...storedList];
        updatedStoredList[existingStoredIndex].quantity += quantity;
        localStorage.setItem('list', JSON.stringify(updatedStoredList));
      } else {
        const updatedStoredList = [...storedList, newGame];
        localStorage.setItem('list', JSON.stringify(updatedStoredList));
      }
    }
  };
  

  if (!gameDetails) {
    return <div>Loading game details...</div>;
  }

  return (
    <div className="p-10">
      <h1>{gameDetails.name}</h1>
      <img src={gameDetails.background_image} alt="" className="w-96" />
      <h1>{localStorage.getItem('price')}$</h1>
      <div className="p-10">
        {/* Додали input для кількості товару */}
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
          className="mr-2 border border-gray-300 rounded-md px-2 py-1"
        />
        <button
          className="bg-lime-400 hover:bg-lime-300 rounded-full px-10 py-2 active:bg-lime-400 focus:outline-none focus:ring focus:ring-lime-400"
          onClick={handleBuyButtonClick}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default Game;
