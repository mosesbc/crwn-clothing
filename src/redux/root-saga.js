import {all,call} from 'redux-saga/effects'

import {fetchCollectionsStart} from './shop/shop.sagas'

export default function* rootSaga(){
    yield all([call(fetchCollectionsStart)])//we use all initializes all saga size by side on separate task stream
}