import React, { useEffect, useState } from 'react';
import {Route,Routes,Link, NavLink} from 'react-router-dom'
import Game from './Game';

function Shop() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const apikey = 'e3f6260344114b29b9e9340683a86d41';
  const url = `https://api.rawg.io/api/games?key=${apikey}&dates=2019-09-01,2019-09-30&platforms=18,1,7&page=5`;
  const prices =[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,12,2323,231,123,132,32,214,234,3243,21];
  const [game,setgame] = useState('');
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [url]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change slide every 3 seconds (adjust as needed)

    return () => {
      clearInterval(slideInterval);
    };
  }, [items.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className='p-4 max-w-full '>
        <div className='flex items-center justify-between'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded' onClick={prevSlide}>
            &#8592;
          </button>
          <div className='w-full text-center grayscale hover:grayscale-0' onClick={()=>localStorage.setItem("price",prices[currentIndex])}>
          <Link to={`/game/${items[currentIndex].id}`}>
            <img src={items[currentIndex].background_image} alt="slider-image" className='mx-auto h-60 sm:h-96 w-full' />
            <h3 className='text-xl font-bold bg-black relative opacity-100 text-white'>{items[currentIndex].name}</h3>
          </Link>

          </div>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded' onClick={nextSlide}>
            &#8594;
          </button>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 relative top-10'>
          {items.map((item, i) => (
            <div key={i} className='h-72 hover:text-lime-200 bg-black text-white text-center' onClick={()=>localStorage.setItem("price",prices[i])}>
               <Link to={`/game/${item.id}`} key={i} className='h-72 hover:text-lime-200 bg-black text-white text-center'> 
              <img src={item.background_image} alt=""/>
              <p onClick={()=>setgame(item.name)} className='text-center' >{item.name}</p>
              <br/>
              <p className=''>{prices[i]}$</p>
              
            </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Shop;
