// Import the functions you need from Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your Firebase configuration (copy-paste from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAhe6DV4xKXmQ0gnqB_Y11DE5XNO3LhoHg",
  authDomain: "torontobetting.firebaseapp.com",
  projectId: "torontobetting",
  storageBucket: "torontobetting.firebasestorage.app",
  messagingSenderId: "853729122637",
  appId: "1:853729122637:web:78e49fdcf435b92a48bf04",
  measurementId: "G-2LFP3M1XRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Reference to the form and the Create Bet button
const betForm = document.getElementById('bet-form');

// Handle form submission
betForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the form data
    const betTitle = document.getElementById('bet-title').value;
    const betDescription = document.getElementById('bet-description').value;
    const betOdds = document.getElementById('bet-odds').value;
    const betDeadline = document.getElementById('bet-deadline').value;

    // Add the bet to Firestore
    try {
        const docRef = await addDoc(collection(db, "bets"), {
            title: betTitle,
            description: betDescription,
            odds: betOdds,
            deadline: betDeadline,
            createdAt: new Date()
        });
        console.log("Bet created with ID: ", docRef.id);
        alert('Bet Created Successfully!');
    } catch (e) {
        console.error("Error adding bet: ", e);
        alert('Error creating bet!');
    }
});

