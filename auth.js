import { auth } from './firebase.js';
import { onAuthStateChanged,
         signOut 
 } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user.email);

    document.querySelector("#login-btn").style.display = "none";
    document.querySelector("#signup-btn").style.display = "none";
    document.querySelector("#logout-btn").style.display = "block";

  } else {
    console.log("Guest user"); 

    document.querySelector("#login-btn").style.display = "block";
    document.querySelector("#signup-btn").style.display = "block";
    document.querySelector("#logout-btn").style.display = "none";
    window.location.href = "login.html";
  }

});

/* Logout User */
const logout = document.querySelector('#logout-btn');

if (logout){
    logout.addEventListener('click', async (e) => {
      e.preventDefault();
      await signOut(auth);
      console.log('user has been signed out');
      window.location.href= "login.html";
    });
}
