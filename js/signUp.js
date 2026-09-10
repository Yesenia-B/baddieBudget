import { auth } from './firebase.js';
import { createUserWithEmailAndPassword,
        updateProfile
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const signupForm = document.querySelector('#signup-form');

/* Get User Info */
if(signupForm){
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

const email = signupForm.querySelector("#email").value;
const password = signupForm.querySelector("#password").value;
const name = signupForm.querySelector("#name").value;

/* Sign Up User */
try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
        displayName: name
    });
    console.log("Signed up!", userCredential.user.email);
    alert(`Your account has been created, ${name}!`);
    signupForm.reset();
    window.location.href = "dashboard.html";
    
  } catch (err) {
    console.error("SIGN UP ERROR:", err.code, err.message);
    alert(err.message);
  }

})};