import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC3UkLLaKne6raMJM1F7KzYBSlylQwYpws",
    authDomain: "grazii.firebaseapp.com",
    databaseURL: "https://grazii.firebaseio.com",
    projectId: "grazii",
    storageBucket: "grazii.appspot.com",
    messagingSenderId: "108302994160",
    appId: "1:108302994160:web:4bc6d317c5541f67489035",
    measurementId: "G-3T2E5Y2YT9"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      }) 
    } catch(error) {
      console.log('Error creating user. ', error.message);
    }
  }

  return userRef;
} 

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
