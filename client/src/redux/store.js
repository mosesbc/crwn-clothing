import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import {persistStore} from 'redux-persist'
import rootReducer from './root-reducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './root-saga'
/* removed will now use redux saga
//import thunk from 'redux-thunk'
//const middleWares = [thunk]
*/

const sagaMiddleware = createSagaMiddleware()

const middleWares = [sagaMiddleware]

if(process.env.NODE_ENV === 'development'){
    middleWares.push(logger)
}

export const store = createStore(rootReducer,applyMiddleware(...middleWares))

export const persistor = persistStore(store);//creating perristed version of our store

sagaMiddleware.run(rootSaga)//instead of running all sagas , we created a root sage



export default {store,persistor};

