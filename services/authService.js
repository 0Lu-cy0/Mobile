import { auth, db } from "./firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithCredential
} from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";

// ✅ Hàm lưu thông tin user vào Firestore
const saveUserToFirestore = async (user) => {
    try {
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            createdAt: new Date().toISOString(),
        });
        console.log("User saved to Firestore!");
    } catch (error) {
        console.error("Error saving user:", error);
    }
};

// Đăng ký bằng Email & Password
export const registerWithEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Đăng nhập bằng Email & Password
export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Đăng nhập/Đăng ký bằng Google
export const loginWithGoogle = async () => {
    try {
        const { type, idToken } = await Google.useIdTokenAuthRequest({
            androidClientId: "YOUR_ANDROID_CLIENT_ID",
            iosClientId: "YOUR_IOS_CLIENT_ID"
        });

        if (type === "success") {
            const credential = GoogleAuthProvider.credential(idToken);
            const userCredential = await signInWithCredential(auth, credential);
            return userCredential.user;
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
