import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import {Route,Switch,Redirect} from 'react-router-dom'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {connect} from 'react-redux'
import {selectCurrentUser} from './redux/user/user.selector'
import {createStructuredSelector} from 'reselect'
import { setCurrentUser } from './redux/user/user.action';
import CheckoutPage from './pages/checkout/checkout.component';


class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    
    //this block is now implemented using redux-saga
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

    //  if(userAuth){
    //     //query from dev if not exists then save to DB
    //     const userRef = await createUserProfileDocument(userAuth);

    //     //subscribe to userRef/snapshot
    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //           ...snapShot.data()
    //       });
    //     })

    //   } 
    //   setCurrentUser(userAuth)
    //   /* used for 1 time migration only, "shop collection"
    //   addCollectionAndDocuments('collections',collectionsArray.map(({title,items}) => ({title,items})))//create new list with necessary fields only
    //   */
    // })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }

  render(){
    return (
      <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <Route path='/shop' component={ShopPage}></Route>
        <Route exact path='/checkout' component={CheckoutPage}></Route>
        <Route exact path='/signin' render={()=>this.props.currentUser? (<Redirect to='/' />) : (<SignInAndSignUpPage/>) }></Route>
      </Switch>
      </div>
    );
  }
  
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(App);
