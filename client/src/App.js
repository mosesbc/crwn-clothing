import React,{useEffect} from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import {Route,Switch,Redirect} from 'react-router-dom'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {connect} from 'react-redux'
import {selectCurrentUser} from './redux/user/user.selector'
import {createStructuredSelector} from 'reselect'
import { checkUserSession } from './redux/user/user.action';
import CheckoutPage from './pages/checkout/checkout.component';


const App = ({checkUserSession,currentUser}) => {

  useEffect(()=>{
    checkUserSession();
  },[checkUserSession])//passing this function instead of ([] or currentUser) will make this behave more like componentDidmount, pero parang same naman pag empty array, baka sa bagong version

  return (
    <div>
    <Header/>
    <Switch>
      <Route exact path='/' component={HomePage}></Route>
      <Route path='/shop' component={ShopPage}></Route>
      <Route exact path='/checkout' component={CheckoutPage}></Route>
      <Route exact path='/signin' render={()=>currentUser? (<Redirect to='/' />) : (<SignInAndSignUpPage/>) }></Route>
    </Switch>
    </div>
  );
  
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession:() => {dispatch(checkUserSession())}
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
