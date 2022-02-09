import firebase from 'firebase/compat';
import 'firebase/firestore';

const firebaseConfig = {
   apiKey: "AIzaSyDYrfzyQiPGHhEOaJURyrck7_k3iqEGLQY",
   authDomain: "todo-app-affea.firebaseapp.com",
   projectId: "todo-app-affea",
   storageBucket: "todo-app-affea.appspot.com",
   messagingSenderId: "466125575871",
   appId: "1:466125575871:web:bc70a8780f8f883219980a",
  //  measurementId: "G-T6YPSZJCWF"
 };

firebase.initializeApp(firebaseConfig);

 export default firebase;