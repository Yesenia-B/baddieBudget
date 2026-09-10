import { auth } from './firebase.js';
import { onAuthStateChanged,
         signOut 
 } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* Logout User */
const logout = document.querySelector('#logout-btn');

if (logout){
    logout.addEventListener('click', async (e) => {
      e.preventDefault();
      await signOut(auth);
      console.log('user has been signed out');
      window.location.href= "index.html";  
    
    });
  }