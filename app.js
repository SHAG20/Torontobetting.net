// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Firebase Config (Replace with your Firebase project settings)
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle Bet Creation
document.getElementById("bet-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const betTitle = document.getElementById("bet-title").value;
    const betDescription = document.getElementById("bet-description").value;
    const betOdds = document.getElementById("bet-odds").value;
    const betDeadline = document.getElementById("bet-deadline").value;
    const creator = "User"; // Change this to track real users in the future

    if (!betTitle || !betDescription || !betOdds || !betDeadline) {
        alert("Please fill in all fields!");
        return;
    }

    try {
        await addDoc(collection(db, "bets"), {
            title: betTitle,
            description: betDescription,
            odds: betOdds,
            deadline: betDeadline,
            creator: creator,
            status: "active"
        });
        alert("Bet Created!");
        loadBets(); // Refresh the bet list
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

// Fetch and display active bets
async function loadBets() {
    const querySnapshot = await getDocs(collection(db, "bets"));
    const betsList = document.getElementById("bets-list");
    betsList.innerHTML = ""; // Clear previous bets

    querySnapshot.forEach((doc) => {
        const bet = doc.data();
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${bet.title}</strong> - ${bet.description} 
            | Odds: ${bet.odds} | Deadline: ${bet.deadline}
            <button onclick="confirmBet('${doc.id}')">Confirm</button>
        `;
        betsList.appendChild(li);
    });
}

// Confirm bet results (Only the creator should do this)
async function confirmBet(betId) {
    try {
        const betRef = doc(db, "bets", betId);
        await updateDoc(betRef, { status: "confirmed" });
        alert("Bet Confirmed!");
        loadBets(); // Refresh the bet list
    } catch (e) {
        console.error("Error updating bet: ", e);
    }
}

loadBets(); // Load bets on page load
