import React from 'react';
import HomePage from './pages/homepage/homepage.component'
import {Route,Switch} from 'react-router-dom'
import './App.css';

const HatsPage = () => (
  <div>
    <h1>HATS</h1>
  </div>
)

function App() {
  return (
    <div>
    <Switch>
      <Route exact path='/' component={HomePage}></Route>
      <Route path='/hats' component={HatsPage}></Route>
    </Switch>
    </div>
  );
}

export default App;
