import {takeLatest,call,put} from 'redux-saga/effects'

import ShopActionTypes from './shop.types'
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.action'

export function* fetchCollectionsAsync(){
    yield console.log('I am fired')
        
    try{
        const collectionRef = firestore.collection('collections')
        const snapshot = yield collectionRef.get()
        const collectionMap = yield call(convertCollectionsSnapshotToMap,snapshot)//call instructs middleware tocall a function
        yield put(fetchCollectionsSuccess(collectionMap))// put is like dispatch , accepets and object with type and payload
    }catch(error){
        yield put(fetchCollectionsFailure(error.errorMessage))
    }
    /* code fron action/thunk combo , commented out cos now were using redux-saga
    // const collectionRef = firestore.collection('collections')//the name of our collection in firebase , need to edit this to collectionsgit 
    //     dispatch(fetchCollectionsStart())

    //     collectionRef.get().then(snapshot => {
    //       const collectionMap = convertCollectionsSnapshotToMap(snapshot)
    //       dispatch(fetchCollectionsSuccess(collectionMap))
    //     }).catch(error => dispatch(fetchCollectionsFailure(error.errorMessage)))
    */
}

export function* fetchCollectionsStart(){
    //yield takeEvery( have used takeLatest instead
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}