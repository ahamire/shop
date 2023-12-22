import { useState } from 'react'
import './App.css'
import {Route,Routes,Link, NavLink} from 'react-router-dom'
import Shop from './shop'
import Consoles from './Consoles'
import Contact from './Contact'
function App() {
  const [count, setCount] = useState(0)
//   GET https://api.rawg.io/api/platforms?key=YOUR_API_KEY
// GET https://api.rawg.io/api/games?key=YOUR_API_KEY&dates=2019-09-01,2019-09-30&platforms=18,1,7
  
  return (
    <>
      <div className='container mx-auto overflow-x-hidden'>
        <header className=' h-24  text-lime-500 text-4xl flex items-center px-10 justify-between' >
          <a href="" >GameStore</a>
          <Link to="" className='pr-20'><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg></Link>
        </header>
        <nav className='flex justify-evenly bg-lime-400 text-white'>
            <h1><Link to="">Games</Link></h1>
            <h1><Link to="consoles">Consoles</Link></h1>
            <h1><Link to="contact">Contact</Link></h1>
        </nav> 
        
      <Routes>
        <Route path='*' element={<Shop/>}/>
        <Route path='consoles' element={<Consoles/>}></Route>
        <Route path='contact' element={<Contact/>}></Route>
      </Routes>
      </div>
    </>
  )
}

export default App
