// // Import required modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
// import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword , signInWithPopup, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
// import {getfirestore, setdoc, doc} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDvZLSXlO4V8rCj86aga5ekq84GvNy5KIY",
//   authDomain: "login-form-58675.firebaseapp.com",
//   projectId: "login-form-58675",
//   storageBucket: "login-form-58675.appspot.com",
//   messagingSenderId: "621585474697",
//   appId: "1:621585474697:web:d8b943c246c63359811258"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// function showMessage(message, divId) {
//     var messageDiv=document.getElementById(divId);
//     messageDiv.style.display = "block";
//     messageDiv.innerHTML = message;
//     messageDiv.style.opacity=1;
//     setTimeout(function() {
//         messageDiv.style.opacity=0;
//     },5000);
// }
// const auth = getAuth(app);
// const signUp = document.getElementById('Submit-signup-form');
// signUp.addEventListener('click', (event) => {
//     event.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const firstName = document.getElementById('firstName').value;
//     const lastName = document.getElementById('lastName').value;
//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             const user = userCredential.user;
//             const userData={
//                 email: email,
//                 firstName: firstName,
//                 lastName: lastName
//             };
//             showMessage('Account created successfully', 'signup-message');
//             const docRef=doc(db, "users", user.uid);
//             setdoc(docRef, userData)
//             .then(() => {
//                 window.location.href='index.html';
//             })
//             .catch((error) => {
//                 console.error('Error signing up: ', error);
//             });  
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             if(errorCode=='auth/email-already-in-use'){
//                 showMessage('Email already in use', 'signup-message');
//             }
//             else{
//                 showMessage('unable to create account', 'signup-message');
//             }
//         })
// })

// // Google sign-in function
// document.getElementById('google-login').addEventListener('click', () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//         .then((result) => {
//             // User signed in successfully
//             const user = result.user;
//             console.log('User signed in: ', user);
//             // Redirect to home page
//             window.location.href = 'home.html'; // Change to your home page URL
//         })
//         .catch((error) => {
//             console.error('Error signing in: ', error);
//         });
// });
// Import required modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvZLSXlO4V8rCj86aga5ekq84GvNy5KIY",
  authDomain: "login-form-58675.firebaseapp.com",
  projectId: "login-form-58675",
  storageBucket: "login-form-58675.appspot.com",
  messagingSenderId: "621585474697",
  appId: "1:621585474697:web:d8b943c246c63359811258"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Utility function to display messages
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;

    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Signup Form Handler
document.getElementById('Submit-signup-form').addEventListener('click', (event) => {
    event.preventDefault();

    // Get form values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();

    // Basic validation
    if (!email || !password || !firstName || !lastName) {
        showMessage('Please fill out all fields', 'signup-message');
        return;
    }

    // Create a new user
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName,
            };

            // Store user details in Firestore
            const docRef = doc(db, "users", user.uid);
            return setDoc(docRef, userData);
        })
        .then(() => {
            showMessage('Account created successfully!', 'signup-message');
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to the home page
            }, 2000);
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Email already in use', 'signup-message');
            } else {
                showMessage('Unable to create account', 'signup-message');
            }
            console.error('Error creating account:', error);
        });
});

// Google Sign-In Handler
document.getElementById('google-login').addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log('User signed in:', user);

            // Optional: Store Google user in Firestore if needed
            const userData = {
                email: user.email,
                displayName: user.displayName,
            };
            const docRef = doc(db, "users", user.uid);

            return setDoc(docRef, userData, { merge: true });
        })
        .then(() => {
            window.location.href = 'home.html'; // Redirect to home page
        })
        .catch((error) => {
            console.error('Error signing in with Google:', error);
        });
});

const signIn=document.getElementById('submit-signin-form');
signIn.addEventListener('click', (event) => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showMessage('Signed in successfully', 'signin-message');
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='homepage.html';
    })
    .catch((error)=>{
         const errorCode = error.code;
         if(errorCode=='auth/invalid-credential'){
            showMessage('Incorrect Email or password', 'signin-message');
         }else{
            showMessage('Account does not Exist', 'signin-message');
         }
    })
})