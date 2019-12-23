import {all,call} from 'redux-saga/effects'

import {fetchCollectionsStart} from './shop/shop.sagas'
import {userSagas} from './user/user.sagas'

export default function* rootSaga(){
    yield all([call(fetchCollectionsStart), call(userSagas)])//we use all initializes all saga size by side on separate task stream
}