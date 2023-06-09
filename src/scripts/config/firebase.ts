import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAESNiprFXFCWCi0EJ3gGYQHigvld65DY0",
  authDomain: "tabletop-of-many-things.firebaseapp.com",
  projectId: "tabletop-of-many-things",
  storageBucket: "tabletop-of-many-things.appspot.com",
  messagingSenderId: "667406653656",
  appId: "1:667406653656:web:72fcf4e2ad784917349fad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
