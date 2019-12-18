import {combineReducers} from 'redux'

import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'

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
export default combineReducers({
    user:userReducer,
    cart:cartReducer
})