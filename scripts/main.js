
import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";

import {
getDatabase,
ref,
get
}
from "https://www.gstatic.com/firebasejs/12.12.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA_XrD0M2R-V0IvU_lrxlZ82wIp_K7QoCg",
    authDomain: "error-inc.firebaseapp.com",
    databaseURL: "https://error-inc-default-rtdb.firebaseio.com",
    projectId: "error-inc",
    storageBucket: "error-inc.firebasestorage.app",
    messagingSenderId: "876188868410",
    appId: "1:876188868410:web:ca7de451707bd9975c7a03"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const userBtn = document.getElementById("userBtn");
const authPopup = document.getElementById("authPopup");
const profilePopup = document.getElementById("profilePopup");
const closeAuth = document.getElementById("closeAuth");
const closeProfile = document.getElementById("closeProfile");
const profileName = document.getElementById("profileName");
const logoutBtn = document.getElementById("logoutBtn");
const currentUser = localStorage.getItem("errorinc_user");

if (currentUser) {

    userBtn.innerText =
    currentUser.charAt(0).toUpperCase();

}

userBtn.onclick = () => {

    const user =
    localStorage.getItem("errorinc_user");

    if (!user) {

        authPopup.classList.remove("hidden");

    } else {
        profileName.innerText = user;
        profilePopup.classList.remove("hidden");
    }
};

closeAuth.onclick = () => {
    authPopup.classList.add("hidden");
};

closeProfile.onclick = () => {
    profilePopup.classList.add("hidden");
};

authPopup.onclick = (e) => {

    if (e.target === authPopup) {
        authPopup.classList.add("hidden");
    }

};

profilePopup.onclick = (e) => {

    if (e.target === profilePopup) {
        profilePopup.classList.add("hidden");
    }

};

logoutBtn.onclick = () => {
    if(!confirm("Are you sure you want to log out?")) return;
    localStorage.removeItem("errorinc_user");
    location.reload();

};

document.querySelectorAll("button").forEach(btn => {

    if (btn.innerText.toLowerCase().includes("join")) {

        btn.addEventListener("click", () => {

            const user =
            localStorage.getItem("errorinc_user");

            if (!user) {

                authPopup.classList.remove("hidden");

            } else {
                window.location.href = "/community"

            }

        });

    }

});
