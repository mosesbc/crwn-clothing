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

/* renamed while converting to redux sagas
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'}); //trigger google signin popup
export const signInWithGoogle = () => auth.signInWithPopup(provider);
*/
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt:'select_account'}); //trigger google signin popup
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

//will query data from db using auth but if not existing save it to db
export const createUserProfileDocument = async (userAuth,additionalData)  => {
    
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){

        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData                
            })
        } catch(error){
            console.log('error creating user', error.message)

        }
    }

    return userRef;

}

export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)

    const batch = firestore.batch(); // used for batch process
    objectsToAdd.forEach( obj => {
        const newDocRef = collectionRef.doc()//creates a document reference with random id only, no other values
        batch.set(newDocRef,obj)//instead of newDocRef.set , use batch.set for batch process
    })

    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) =>{
    const transformedCollection = collections.docs.map(doc => {
        const {title,items} = doc.data();

        return {
            routeName:encodeURI(title.toLowerCase()),//encodeURI - handles un-common url character
            id:doc.id,
            title,
            items
        }

    })
     return transformedCollection.reduce(((accumulator,collection)=>{
         accumulator[collection.title.toLowerCase()] = collection
         return accumulator
     }),{})

}

export const getCurrentUser = () => {
    return new Promise((resolve,reject)=>{
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe()
            resolve(userAuth)
        }, reject)

    })
}


export default firebase;