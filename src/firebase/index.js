import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDdq15ho9IZtlOLZCfyoP8m2n2erO7e_eQ",
  authDomain: "onlyhoddies-utn.firebaseapp.com",
  projectId: "onlyhoddies-utn",
  storageBucket: "onlyhoddies-utn.appspot.com",
  messagingSenderId: "696582201657",
  appId: "1:696582201657:web:0d5c135341d56545fb48e8",
  measurementId: "G-00M8M0939C"
};

initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);

const auth = getAuth()
const db = getFirestore()

export {
    auth,
    db
}
