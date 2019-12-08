import React from 'react';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import {Route,Switch} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div>
    <Switch>
      <Route exact path='/' component={HomePage}></Route>
      <Route path='/shop' component={ShopPage}></Route>
    </Switch>
    </div>
  );
}

export default App;
