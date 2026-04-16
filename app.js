import {auth, db } from './firebase.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

console.log("🔥 App is running"); // test

const form = document.getElementById("budget-form");
const user = auth.currentUser;

if (form){
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  try {
    await addDoc(collection(db, "transactions"), {
      uid: user.uid,
      title,
      amount,
      type,
      createdAt: new Date()
    });

    console.log("✅ Saved to Firebase!");
    alert("Transaction saved!");

    form.reset();

  } catch (err) {
    console.error("❌ Firebase error:", err);
  }
})
}

/* Mobile Menu */
document.addEventListener("DOMContentLoaded", () => {
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

if (menu && menuLinks) {
  menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
  });
}
});