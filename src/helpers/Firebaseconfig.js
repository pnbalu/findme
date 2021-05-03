import * as firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA_gYXx40COJH68wCsgYq4Ad6mCvY-Xykk",
    authDomain: "findme-d0ca7.firebaseapp.com",
    databaseURL: "https://findme-d0ca7-default-rtdb.firebaseio.com",
    projectId: "findme-d0ca7",
    storageBucket: "findme-d0ca7.appspot.com",
    messagingSenderId: "1039056751879",
    appId: "1:1039056751879:web:b74ef0c3a7fe14c4d589a2",
    measurementId: "G-XRX2M9151Y"
  }
  

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };