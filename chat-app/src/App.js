
import './App.css';
import Home from './components/home';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import { createContext, useState } from 'react';
import Myprofile from './components/myprofile';

export const store = createContext();
function App() {
  const [token,setToken]=useState(null);
  return (
    <div>
   <store.Provider value={[token,setToken]}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path='/login'  element={<Login/>} />
        <Route path='/myprofile' element={<Myprofile/>} />
      </Routes>
      </BrowserRouter>
   </store.Provider>
      
    </div>
  );
}

export default App;
