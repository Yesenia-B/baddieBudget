import { requireAuth } from "./authGuard.js";
import {auth, db } from './firebase.js';
import { doc, 
        collection, 
        addDoc, 
        query, 
        where, 
        onSnapshot, 
        deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

requireAuth();

let currentUser = null;

const form = document.getElementById("budget-form");
const list = document.getElementById("transaction-list");

// checking if user
onAuthStateChanged(auth, (user) => {
  if(user) {
    currentUser = user;
    console.log("Logged in as: ", user.uid);
    listenForTransactions();
  } else {
    console.log("No user logged in!");
  }
});


/* Form */
if (form){
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

  if (!currentUser) return alert("User not logged in!");

  const title = document.getElementById("title").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;

  try {
    await addDoc(collection(db, "transactions"), {
      uid: currentUser.uid,
      title,
      amount,
      type,
      category,
      createdAt: new Date()
    });

    console.log("✅ Saved to Firebase!");
    alert("Transaction saved!");

    form.reset();
    listenForTransactions();

  } catch (err) {
    console.error("❌ Firebase error:", err);
  }
});

//listener 
 function listenForTransactions() {
  if(!currentUser) return;

  const q = query(
    collection(db, "transactions"),
    where("uid", "==", currentUser.uid)
  );

  onSnapshot(q, (snapshot) => {
    list.innerHTML = "";

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();

      const row = document.createElement("tr");
    
      row.innerHTML= `
        <td>${data.title}</td>
        <td>${data.amount.toFixed(2)}</td>
        <td>${data.category}</td>
        <td>${data.type}</td>
        <td>
          <button class="delete-btn" data-id = "${docSnap.id}">
            <i class = "fa-solid fa-trash"></i>
          </button>
        </td>
      
      `;

      list.appendChild(row);
    });
  });
}

//delete
list.addEventListener("click", async (e) => {
    const btn = e.target.closest(".delete-btn");
    if(!btn) return;

    const id = btn.dataset.id;

    if (!confirm("Delete this transaction?")) return;

    try {
      await deleteDoc(doc(db, "transactions", id));
      loadTransactions();
    } catch(err){
      console.error("Delete failed:", err);
    }
});
}
