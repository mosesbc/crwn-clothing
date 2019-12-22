import ShopActionTypes from './shop.types'
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
/* replaced by fetchCollections actions 
export const updateCollections = collectionsMap => ({
    type:ShopActionTypes.UPDATE_COLLECTIONS,
    payload:collectionsMap
})
*/

export const fetchCollectionsStart = () => ({
    type:ShopActionTypes.FETCH_COLLECTIONS_START
})

export const fetchCollectionsSuccess = collectionsMap => ({
    type:ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload:collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type:ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload:errorMessage
})


//we cancall this function because of redux=thunk
export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections')//the name of our collection in firebase , need to edit this to collectionsgit 
        dispatch(fetchCollectionsStart())

        collectionRef.get().then(snapshot => {
          const collectionMap = convertCollectionsSnapshotToMap(snapshot)
          dispatch(fetchCollectionsSuccess(collectionMap))
        }).catch(error => dispatch(fetchCollectionsFailure(error.errorMessage)))
    }
}