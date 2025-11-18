
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword , 
  getAuth ,
  signInWithEmailAndPassword,
   signOut  } from "firebase/auth";
import { addDoc ,
   collection, 
   getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAq7o7YBkbPeS7PPmrLECYi0KaslFvjfOE",
  authDomain: "netflix-clone-619c9.firebaseapp.com",
  projectId: "netflix-clone-619c9",
  storageBucket: "netflix-clone-619c9.firebasestorage.app",
  messagingSenderId: "155010014690",
  appId: "1:155010014690:web:bf09b239fec97cece7edbb",
  measurementId: "G-9WC24L6G76"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try
    {
  const res=await createUserWithEmailAndPassword(auth,email,password);
  const user =res.user;
  await addDoc (collection(db,"user"),{
    uid:user.uid,
    name,
    authProvider:"local",
    email
  })
    }
    catch(error){
         console.log(error);
         alert(error);
    }
    
    
}


// login funtion

const login =async (email,password)=>{
    try{
       await signInWithEmailAndPassword(auth,email,password);

    }
    catch(error){
        console.log(error);
        alert(error);
    }
}
export const logout=()=>{
    
       signOut(auth);
 

}

export { auth, db, login, signup,  };
