import { requireAuth } from "./authGuard.js";
import {auth, db } from './firebase.js';
import {doc, 
        collection, 
        addDoc, 
        query, 
        where, 
        orderBy,
        onSnapshot, 
        Timestamp,
        deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
requireAuth();

let currentUser = null;

const form = document.getElementById("budget-form");
const list = document.getElementById("transaction-list");

const incomeDisplay = document.getElementById("total-income");
const expenseDisplay = document.getElementById("total-expense");
const balanceDisplay = document.getElementById("balance");

// checking if user
onAuthStateChanged(auth, (user) => {
  if(user) {
    currentUser = user;
    console.log("Logged in as: ", user.uid);
    listenForTransactions();
  } else {
    console.log("No user logged in!");
  }

  const logoutBtn= document.getElementById("logout-btn");
  if(logoutBtn){
    logoutBtn.style.display = "inline-flex";
}});


/* Form */
if (form){
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

  if (!currentUser) return alert("User not logged in!");

  const title = document.getElementById("title").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  try {
    await addDoc(collection(db, "transactions"), {
      uid: currentUser.uid,
      title,
      amount,
      type,
      category,
      createdAt: new Date(),
      transactionDate: new Date(date),
      date
    });


    console.log("✅ Saved to Firebase!");
    alert("Transaction saved!");

    form.reset();

  } catch (err) {
    console.error("❌ Firebase error:", err);
  }
});
}

function getCurrentWeekDates(){

  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6: 1);

  const startOfWeek = new Date(today.setDate(diff));
  startOfWeek.setHours(0,0,0,0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23,59,59,999);

  return{
    startOfWeek,
    endOfWeek
  };
}

//listener 
 function listenForTransactions() {
  if(!currentUser) return;

  const {startOfWeek, endOfWeek} = getCurrentWeekDates();

  const q = query(
    collection(db, "transactions"),
    where("uid", "==", currentUser.uid),
    where("transactionDate", ">=", Timestamp.fromDate(startOfWeek)),
    where("transactionDate", "<=", Timestamp.fromDate(endOfWeek)),
    orderBy("transactionDate", "desc")
  );

  onSnapshot(q, (snapshot) => {
    list.innerHTML = "";

    let totalIncome= 0;
    let totalExpenses = 0;

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();

      if(data.type == "income") {
        totalIncome += data.amount;
      }

      if(data.type == "expense") {
        totalExpenses += data.amount;
      }

      const row = document.createElement("tr");
    
      row.innerHTML= `
        <td>${data.title}</td>
        <td>${data.type}</td>
        <td>${data.category}</td>
        <td>${data.amount.toFixed(2)}</td>
        <td>${data.date}</td>
        <td>
          <button class="delete-btn" data-id = "${docSnap.id}">
            <i class = "fa-solid fa-trash"></i>
          </button>
        </td>
      
      `;

      list.appendChild(row);
    });

  const remaining = totalIncome - totalExpenses;

  incomeDisplay.textContent = totalIncome.toFixed(2);

  expenseDisplay.textContent =
  totalExpenses.toFixed(2);

  balanceDisplay.textContent =
  remaining.toFixed(2);

    
  });
}

//delete
list.addEventListener("click", async (e) => {
    const btn = e.target.closest(".delete-btn");
    if(!btn) return;

    const id = btn.dataset.id;

    if (!confirm("Delete this transaction?")) return;

    try {
    } catch(err){
      console.error("Delete failed:", err);
    }
});
});

