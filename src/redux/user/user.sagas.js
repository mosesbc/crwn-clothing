import {takeLatest,put,all, call} from 'redux-saga/effects'
import {UserActionTypes} from './user.types'
import {auth,createUserProfileDocument,googleProvider} from '../../firebase/firebase.utils'

import {googleSignInSuccess, googleSignInFailure} from './user.action'

export function* signInWithGoogle(){
    try{
        // const userRef = yield auth.signInWithPopup(googleProvider);
        // console.log(userRef)
        const {user} = yield auth.signInWithPopup(googleProvider);//destructured from userRef; user is the same object userAuth that we used earlier
        const userRef = yield call(createUserProfileDocument,user);
        const userSnapshot = yield userRef.get()
        yield put(googleSignInSuccess({id:userSnapshot.id,...userSnapshot.data()}))
    }catch(error){
        yield put(googleSignInFailure(error))
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle)
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart)]) 
}