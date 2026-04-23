import { requireAuth } from "./authGuard.js";
import {auth, db } from './firebase.js';
import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

requireAuth();

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if(user) {
    currentUser = user;
    console.log("Logged in as: ", user.uid);
  } else {
    console.log("No user logged in!");
  }
});


/* Form */
const form = document.getElementById("budget-form");
const user = auth.currentUser;

if (form){
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;

  let transactions = [];

  try {
    await addDoc(collection(db, "transactions"), {
      uid: user.uid,
      title,
      amount,
      type,
      category,
      createdAt: new Date()
    });

    console.log("✅ Saved to Firebase!");
    alert("Transaction saved!");

    form.reset();
    loadTransactions();

  } catch (err) {
    console.error("❌ Firebase error:", err);
  }
})

  transaction-list.addEventListener("submit", (e) => {
    
  } )
}

