
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBDsD1ZGZ0nXBG9QZPUCPC-vq9dPeWWNM0",
  authDomain: "netflix-clone-cfe64.firebaseapp.com",
  projectId: "netflix-clone-cfe64",
  storageBucket: "netflix-clone-cfe64.appspot.com",
  messagingSenderId: "678123505675",
  appId: "1:678123505675:web:d18096f8e26e9bd1b9df0e"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore(app)

const signup=async (name,email,password)=>{
    try {
        const res=await createUserWithEmailAndPassword(auth,email,password)
        const user=res.user
        await addDoc(collection(db,'user'),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
        
    }
}

const login=async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
        
    }
}

const logout= ()=>{
    signOut(auth)
}

export {auth,db,login,signup,logout}