import { BrowserRouter, Route, Routes } from 'react-router'
import login from "../pages/login";
import signup from '../pages/signup';
import HomePage from '../pages/HomePage';
import CartPage from '../pages/cartPage';

const Router = ()=>{
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' Component={login}/>
      <Route path='/signup' Component={signup}/>
      <Route path='/Home' Component={HomePage}/>
      <Route path='/cart' Component={CartPage}/>
    </Routes>
    </BrowserRouter>
  )
}

export default Router

