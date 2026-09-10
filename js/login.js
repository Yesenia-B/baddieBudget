import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
      alert("Try again!", err.message);
    }
    
  });
}