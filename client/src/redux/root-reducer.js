import {combineReducers} from 'redux'

import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'
import directoryReducer from './directory/directory.reducer'
import shopReducer from './shop/shop.reducer'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'//storage for local storage and sessionStorage for session storage

const persistConfig = {
  key:'root',
  storage,
  whitelist:['cart'] //cart only since user was already persist by our firebase
}


//all reducer will always be called
//combineReducer will return the global redux state
/*
  a: doSomethingWithA,
  b: processB,
  c: c

  is equivalent to

  a: doSomethingWithA(state.a, action),
  b: processB(state.b, action),
  c: c(state.c, action)
*/
const rootReducer = combineReducers({
  user:userReducer,
  cart:cartReducer,//key is used on the whitelist
  directory:directoryReducer,
  shop:shopReducer,
})
export default persistReducer(persistConfig,rootReducer)