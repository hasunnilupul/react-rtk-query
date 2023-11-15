import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyChncdN1lqgQhUa7Nj870I337nRhaBCoxo",
    authDomain: "react-rtk-query.firebaseapp.com",
    projectId: "react-rtk-query",
    storageBucket: "react-rtk-query.appspot.com",
    messagingSenderId: "213680118697",
    appId: "1:213680118697:web:a04780964230bb3b82c2b8",
    measurementId: "G-D7VH3Q6KYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
analytics.app.automaticDataCollectionEnabled = true;
const db = getFirestore(app);

export { analytics, db };