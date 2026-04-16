import {auth} from '/firebase.js';
import {onAuthStateChanged } from "firebase-auth";
import {requireAuth} from "./authGuard.js";

requireAuth();

onAuthStateChanged(auth, (user) => {
    if (!user){
        window.location.href ="login.html"
    }
});