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
                    doc,
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


      

      
    
                                    
                //tracks the user's st wether they are logged in or logged out
                const checkAuthState = async() => { 
                                onAuthStateChanged(auth, user => {                      
                                    if(user){
                                      console.log("User is logged in");
                                        }
                                        else{ 
                                            window.location.href = 'index.html';                      
                                          console.log("user logged out");
                                        }
                                }) 
                            }
                            checkAuthState(); 



 // Function to show the modal and overlay
            function showModal() {
                document.getElementById('confirmationModal').style.display = 'block';
                document.getElementById('overlay').style.display = 'block';
            }

            // Function to hide the modal and overlay
            function hideModal() {
                document.getElementById('confirmationModal').style.display = 'none';
                document.getElementById('overlay').style.display = 'none';
            }

            document.getElementById('dashboardLink').addEventListener('click', showModal);        
            










            // Event listener for the "Yes" button in the modal
            document.getElementById('yesButton').addEventListener('click', async () => {
                // Get the buttonValue from the data attribute
                const buttonValue = document.getElementById('confirmationModal').getAttribute('data-button-value');

                try {
                    // Get the currently logged-in user
                    const user = auth.currentUser;

                    if (user) {
                        // Store the button value in Firestore subcollection
                        const userId = user.uid;
                        // Reference to the parent document
                        const parentDocRef = doc(db, 'userRecords', userId);
                        // Reference to the subcollection within the parent document
                        const subcollectionRef = collection(parentDocRef, 'history');
                        await addDoc(subcollectionRef, {
                            value: buttonValue,
                            timestamp: new Date(),
                            status: 'pending',
                        });

                        // Redirect to the link associated with the button
                        const link = document.querySelector(`[data-value="${buttonValue}"]`).getAttribute('data-link');
                        if (link) {
                            // window.location.href = link;
                            console.log("You clicked " + link);
                        }

                        // Display a success message
                        console.log(`Button value "${buttonValue}" has been stored in Firestore`);
                    } else {
                        // User is not logged in, handle accordingly
                        alert('Please log in to place your order.');
                    }
                } catch (error) {
                    // Handle any errors
                    console.error(error);
                    alert('Error storing button value in Firestore.');
                }

                // Hide the modal
                hideModal();
            });

            // Event listener for the "No" button in the modal
            document.getElementById('noButton').addEventListener('click', () => {
                // Hide the modal without taking any action
                hideModal();
            });



           
    