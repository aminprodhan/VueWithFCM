// import firebase from 'firebase/app'
// import 'firebase/firebase-messaging'

import { initializeApp } from 'firebase/app';
import { getMessaging } from "firebase/messaging";

var firebaseConfig = {
    apiKey: "AIzaSyDBVCVV0pS2hZzhlmRA0UiZBsCTY2d0c7A",
    authDomain: "hotel-booking-61c6b.firebaseapp.com",
    projectId: "hotel-booking-61c6b",
    storageBucket: "hotel-booking-61c6b.appspot.com",
    messagingSenderId: "795794744522",
    appId: "1:795794744522:web:0cd22439bb35efcfef0033",
    measurementId: "G-5T9NCWBW3V"
}
// firebase.initializeApp(firebaseConfig)
// export default firebase.messaging()

const app = initializeApp(firebaseConfig);
// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);
export default messaging;
