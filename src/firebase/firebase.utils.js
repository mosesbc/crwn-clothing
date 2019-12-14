import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyD8jsI00mlSv94-gn9BNA0IoHmYHvAaC7I",
    authDomain: "crwn-db-b9700.firebaseapp.com",
    databaseURL: "https://crwn-db-b9700.firebaseio.com",
    projectId: "crwn-db-b9700",
    storageBucket: "crwn-db-b9700.appspot.com",
    messagingSenderId: "945828611243",
    appId: "1:945828611243:web:35b29e8cdfc930686723ee",
    measurementId: "G-GQK5EGXRDN"
}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'}); //trigger google signin popup
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;