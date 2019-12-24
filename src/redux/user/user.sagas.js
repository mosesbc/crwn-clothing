import {takeLatest,put,all, call} from 'redux-saga/effects'
import {UserActionTypes} from './user.types'
import {auth,createUserProfileDocument,googleProvider,getCurrentUser} from '../../firebase/firebase.utils'
import {signInSuccess, signInFailure, signOutSuccess,signOutFailure} from './user.action'

export function* getSnapshotFromUserAuth(userAuth){
    try{
        const userRef = yield call(createUserProfileDocument,userAuth);
        const userSnapshot = yield userRef.get()
        yield put(signInSuccess({id:userSnapshot.id,...userSnapshot.data()}))
    }catch(error){
        yield put(signInFailure(error))
    }

}

export function* signInWithGoogle(){
    try{
        // const userRef = yield auth.signInWithPopup(googleProvider);
        // console.log(userRef)
        const {user} = yield auth.signInWithPopup(googleProvider);//destructured from userRef; user is the same object userAuth that we used earlier
        yield getSnapshotFromUserAuth(user)
    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* signInWithEmail({payload:{email,password}}){
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email,password)//returns the same type of object with signInWithPopup
        yield getSnapshotFromUserAuth(user)
    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser()//returns a promise with a resolve that is a user
        if(!userAuth) return
        yield getSnapshotFromUserAuth(userAuth)
    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* signOut(){
    try{
        yield auth.signOut()
        yield put(signOutSuccess())
    }catch(error){
        yield put(signOutFailure(error))
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle)
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInWithEmail)//this will automatically pass the whole action to signInWithEmail
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAuthenticated)
}

export function* onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START,signOut)
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart),call(onEmailSignInStart),call(onCheckUserSession),call(onSignOutStart)]) 
}