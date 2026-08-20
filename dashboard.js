import { auth } from "./firebase.js";

import { 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { requireAuth } from "./authGuard.js";

requireAuth();

onAuthStateChanged(auth, (user) => {
    if (!user){
        window.location.href ="login.html"
    }
});
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
                "#ff4fa3",
                "#ff6fb5",
                "#ff8fc7",
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