import { auth , db } from "./firebase.js";

import { 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { requireAuth } from "./authGuard.js";

import {
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


requireAuth();

onAuthStateChanged(auth, async(user) => {
    if (!user){
        window.location.href ="signUp.html"
    }

    const name = user.displayName;
    document.querySelector(".dashboard-welcome").textContent =
    `✨Welcome, ${name}!✨`;

    const q = query(
    collection(db, "transactions"),
    where("uid", "==", user.uid)
 );

    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
        console.log(doc.data());
    });

    const logoutBtn= document.getElementById("logout-btn");

    if(logoutBtn){
        logoutBtn.style.display = "inline-flex";
    };
});



//2024 Spending Chart
const ctx = document.getElementById("spendingChart");

new Chart(ctx, {
    type: "doughnut",

    data: {
        labels: [
            "Housing",
            "Transportation",
            "Food",
            "Insurance",
            "Healthcare",
            "Entertainment",
            "Education",
            "Miscellaneous"
        ],

        datasets: [{
            data: [
                26266,
                13318,
                10169,
                9797,
                6197,
                3609,
                1569,
                1218
            ],

            backgroundColor: [
                "#18a913",
                "#62508b",
                "#e30f0f",
                "#ffafd9",
                "#ffc9e8",
                "#ff97ca",
                "#ff75b7",
                "#ff5fa2"
            ],

            borderColor: "#ffffff",
            borderWidth: 2
        }]
    },

    options: {
        responsive: true,

        plugins: {
            title: {
                display: true,
                text: "Average American Spending (2024)"
            },

            legend: {
                position: "bottom"
            }
        },

        cutout: "65%"
    }
});