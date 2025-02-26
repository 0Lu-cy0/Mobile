import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD4kpmASDuVQO4Cmm6AF7LVQBJHvrSI1Sw",
    authDomain: "daytask-835fa.firebaseapp.com",
    databaseURL: "https://daytask-835fa-default-rtdb.firebaseio.com",  // 🔹 Thêm dòng này
    projectId: "daytask-835fa",
    storageBucket: "daytask-835fa.appspot.com",
    messagingSenderId: "902504758421",
    appId: "1:902504758421:web:0727ea37e9a75ec50b6f9c"
};

// Kiểm tra xem Firebase đã khởi tạo chưa
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Chỉ khởi tạo Auth một lần
const auth = getApps().length === 0
    ? initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })
    : getAuth(app);

// Khởi tạo Realtime Database
const database = getDatabase(app);

export { app, auth, database };
