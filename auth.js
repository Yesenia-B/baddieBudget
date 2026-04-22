import { auth } from './firebase.js';
import { signInWithEmailAndPassword,
         onAuthStateChanged,
         signOut 
 } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";



/* Log in */
const loginForm = document.querySelector('#login-form');

if (loginForm){
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email= loginForm.querySelector("#email").value;
    const password = loginForm.querySelector("#password").value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", userCredential.user.email);
      window.location.href= "dashboard.html";

    } catch(err){
      console.error(err.code);
      alert(err.message);
    }
    
  });
}


/* 
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user.email);

    document.querySelector("#login").style.display = "none";
    document.querySelector("#signup").style.display = "none";
    document.querySelector("#logout").style.display = "block";


  } else {
    console.log("Guest user"); 

    document.querySelector("#logout").style.display = "none";
  }

});
*/

/* Logout User */
const logout = document.querySelector('#logout');

if (logout){
    logout.addEventListener('click', (e) => {
      e.preventDefault();
      signOut(auth).then(() => {
        console.log('user has been signed out');
    });
});
}
