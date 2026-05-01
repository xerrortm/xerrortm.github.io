import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";

import {
getDatabase,
ref,
push,
onValue,
remove,
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
const app =
initializeApp(firebaseConfig);
const db =
getDatabase(app);
const bannedWords = [
    "fuck",
    "shit",
    "bitch",
    "niga",
    "nigga",
    "nigger",
    "hell",
    "heck",
];
function filterMessage(text){
    let filtered = text;
    bannedWords.forEach(word => {
        filtered =
        filtered.replace(
            new RegExp(word, "gi"),
            "•••"
        );
    });
    return filtered;
}

async function cleanupOldMessages(){
    const snapshot = await get(ref(db, "community-chat"));
    if(!snapshot.exists()) return;
  
    const now =
    Date.now();
  
    snapshot.forEach(child => {
        const msg =
        child.val();
        if(now - msg.time > 86400000){
            remove(
                ref(
                    db,
                    "community-chat/" + child.key
                )
            );
        }
    });
}

cleanupOldMessages();
const chatMessages =
document.getElementById("chatMessages");
const messageInput =
document.getElementById("messageInput");
const sendBtn =
document.getElementById("sendBtn");
const messageCount =
document.getElementById("messageCount");
function sendMessage(){

    const user =
    localStorage.getItem("errorinc_user");

    if(!user){
        authPopup.classList.remove("hidden");
        return;

    }

    const text =
    messageInput.value.trim();

    if(!text) return;

    push(ref(db, "community-chat"), {
        user,
        text: filterMessage(text),
        time: Date.now()
    });

    messageInput.value = "";

}

sendBtn.onclick =
sendMessage;

messageInput.addEventListener("keypress", e => {

    if(e.key === "Enter"){

        sendMessage();

    }

});

onValue(ref(db, "community-chat"), snapshot => {

    chatMessages.innerHTML = "";

    let total = 0;

    snapshot.forEach(child => {

        const msg =
        child.val();

        total++;

        const div =
        document.createElement("div");

        div.className =
        "message-enter bg-white border border-slate-200 rounded-3xl p-4 shadow-sm hover:shadow-md transition";

        div.innerHTML = `

        <div class="flex gap-4">

            <div onclick="location.href='/u/?n=${msg.user}'" class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center font-black text-white shrink-0">
                ${msg.user.charAt(0).toUpperCase()}
            </div>

            <div class="flex-1">

                <div class="flex items-center gap-2">

                    <div onclick="location.href='/users?name=${msg.user}'" class="font-bold">
                        ${msg.user}
                    </div>

                    <div class="text-xs text-slate-400">
                        ${msg.time}
                    </div>

                </div>

                <div class="mt-2 text-slate-700 break-words leading-relaxed">
                    ${msg.text}
                </div>

            </div>

        </div>

        `;

        chatMessages.appendChild(div);

    });

    messageCount.innerText =
    total;

    chatMessages.scrollTop =
    chatMessages.scrollHeight;

});

</script>
<script>

const userBtn =
document.getElementById("userBtn");

const authPopup =
document.getElementById("authPopup");

const profilePopup =
document.getElementById("profilePopup");

const profileName =
document.getElementById("profileName");

const logoutBtn =
document.getElementById("logoutBtn");

const closeAuth =
document.getElementById("closeAuth");

const closeProfile =
document.getElementById("closeProfile");

const currentUser =
localStorage.getItem("errorinc_user");


if(currentUser){

    userBtn.innerHTML =
    currentUser.charAt(0).toUpperCase();

} else {
    window.location.href = "/login";
}


userBtn.onclick = () => {

    const user =
    localStorage.getItem("errorinc_user");

    if(!user){

        authPopup.classList.remove("hidden");

    } else {

        profileName.innerText =
        user;
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

    if(e.target === authPopup){

        authPopup.classList.add("hidden");

    }

};


profilePopup.onclick = (e) => {

    if(e.target === profilePopup){

        profilePopup.classList.add("hidden");

    }

};
const badgePopup =
document.getElementById("badgePopup");

const badgePopupImage =
document.getElementById("badgePopupImage");

const badgePopupName =
document.getElementById("badgePopupName");

function openBadge(name, image) {

    badgePopupImage.src = image;
    badgePopupName.innerText = name;

    badgePopup.classList.remove("hidden");

    const shine =
    document.getElementById("badgeShine");

    shine.classList.remove("active");

    void shine.offsetWidth;

    shine.classList.add("active");

}

document.getElementById("closeBadgePopup").onclick = () => {

    badgePopup.classList.add("hidden");

};

logoutBtn.onclick = () => {

    if(!confirm("Are you sure you want to log out?")) return;

    localStorage.removeItem("errorinc_user");

    location.reload();

};
