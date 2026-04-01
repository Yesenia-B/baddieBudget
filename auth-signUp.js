import { auth } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const form = document.getElementById("signup-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Signed up!", userCredential.user);
    alert("Your account has been created! You can now sign in.");
    form.reset();
  } catch (err) {
    console.error(err.code, err.message);
    alert("Error: " + err.message);
  }
});