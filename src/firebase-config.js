import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // 코드 추가
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDAf5lXxCKBCKt8yi-BAKmtBM3ed8zyaIA",
    authDomain: "easylogin-b3a6e.firebaseapp.com",
    projectId: "easylogin-b3a6e",
    storageBucket: "easylogin-b3a6e.appspot.com",
    messagingSenderId: "249575888982",
    appId: "1:249575888982:web:1c57aa2107ac4f2afd43f7",
    measurementId: "G-KXPC77XYRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // 코드 추가
export const storage = getStorage(app);