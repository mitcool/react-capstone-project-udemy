import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';

import { 
    getFirestore,
    doc,
    setDoc,
    getDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApgTRnTjrXdjo_D5g5YLJhX2TfyloHzug",
    authDomain: "e-commerce-a5712.firebaseapp.com",
    projectId: "e-commerce-a5712",
    storageBucket: "e-commerce-a5712.appspot.com",
    messagingSenderId: "839787050887",
    appId: "1:839787050887:web:eb418a46c4954b09c40522"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt:"select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePoput = () => signInWithPopup(auth,provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider)

  export const db = getFirestore();

  export const createUserDocument = async (user,additionalInformation = {}) => {
    if(!user) return;
    const userDocRef = doc(db,'users',user.uid); // user instance even if he doesn't exists in db

    const userSnapshot = await getDoc(userDocRef); //check if user exist in db

    if(!userSnapshot.exists()){
        const {displayName,email} = user;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }catch(error){
            console.log(error.message)
        }
    }

    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
     if(!email || !password) return;
     return await createUserWithEmailAndPassword(auth,email,password)
  }

  export const signInUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password);
  }