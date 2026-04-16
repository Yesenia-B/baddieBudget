import { auth } from './firebase.js';
import { createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         onAuthStateChanged,
         signOut 
 } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* Get User Info */
const form = document.querySelector("#signup-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;


/* Sign Up User */
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Signed up!", userCredential.user);
    alert("Your account has been created! You can now sign in.");
    form.reset();
    window.location.href = "dashboard.html";
    
  } catch (err) {
    console.error(err.code, err.message);
    alert(err.message);
  }

});

/* Log in */
const loginForm = document.querySelector("#login-form");

if (loginForm){
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email= document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

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


/* */
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
