
                // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
                import { 
                    getAuth,
                    createUserWithEmailAndPassword,
                    signInWithEmailAndPassword,
                    onAuthStateChanged,
                    signOut
                } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
                import {
                    getFirestore,
                    collection,
                    addDoc,
                    } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js';
        
// Your web app's Firebase configuration
                const firebaseConfig = {
                  apiKey: "AIzaSyDHWn2BsQUOLs4LdGeRwY9HqL-t9zlYEjQ",
                  authDomain: "authfun-b2577.firebaseapp.com",
                  projectId: "authfun-b2577",
                  storageBucket: "authfun-b2577.appspot.com",
                  messagingSenderId: "130874970746",
                  appId: "1:130874970746:web:3952d2f045e4905af361c3"
                };
                
                
                // Initialize Firebase
                   const app = initializeApp(firebaseConfig);
                    const auth = getAuth(app);
                    const db = getFirestore(app);



                    const userEmailSignIn = document.querySelector("#userEmailSignIn"); 
                    const userEmailSignUp = document.querySelector("#userEmailSignUp"); 
                    const userPasswordSignIn = document.querySelector("#userPasswordSignIn");
                    const userPasswordSignUp = document.querySelector("#userPasswordSignUp");
                    const signUpButton = document.querySelector('#signUpButton');
                    const signInButton = document.querySelector('#signInButton');
                    const dashboard = document.querySelector('#dashboard');
                    
//////////user sign up========================================
                    const userSignUp = async () => {
                    try {
                        const signUpEmail = userEmailSignUp.value;
                        const signUpPassword = userPasswordSignUp.value;
                        const firstName = document.querySelector("#firstname").value;
                        const lastName = document.querySelector("#lastname").value;
                // Create a user with email and password
                        const userCredential = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
                        
                        const user = userCredential.user;
                         const userId = user.uid;
                  // Store user data including first name and last name in Firestore
                        
                        const userDocRef = await addDoc(collection(db, 'userRecords'), {
                        email: signUpEmail,
                        name: firstName,
                        lastname: lastName,
                        userId: userId
                        });

                        location.replace("LandingPage.html");
                    }
                     catch (error) {
                        // Handle the error
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(error);
                        if (errorCode === "auth/email-already-in-use") {
                        alert("This email address is already in use. Please choose a different email address.");
                        } else {
                        alert("Error: " + errorMessage);
                        console.log(errorCode + errorMessage);
                        }
                    }
                    };



                
//=======user sign IN=============//



            const userSignIn = async() => {
            const signInEmail = userEmailSignIn.value;
            const signInPassword = userPasswordSignIn.value;
            signInWithEmailAndPassword(auth, signInEmail, signInPassword)
            .then((userCredential) => { 
                const user = userCredential.user;
                alert("You have signed in successfully!");
                location.replace("LandingPage.html");
            })
            .catch((error) =>{
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage)

                if(errorCode === "auth/invalid-email"){
                    alert("Please enter a valid email");
                    }
                if(errorCode=== "auth/wrong-password"){
                    alert("You have entered a wrong password")
                }
                    else{
                    alert("error" + errorMessage);
                    console.log(errorCode + errorMessage)
                    } 
            });
            }

                       
            signUpButton.addEventListener('click', userSignUp);
            signInButton.addEventListener('click', userSignIn);
  