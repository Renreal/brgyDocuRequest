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


      // Get a reference to the "Account Transaction" button
      const dashboardButton = document.querySelector('.Dashboard'); 
      const signOutButton = document.querySelector('#signOutButton');
      const buttons = document.querySelectorAll('button[data-value]');
      const navItemsContainer = document.getElementById('navItems');


                // Function to update the navigation items based on user authentication state
        const updateNavItems = (user) => {
            if (user) {
                // User is logged in
                navItemsContainer.innerHTML = `
                    <a href="#about">About Us</a>
                    <a href="#">Brgy Updates</a>
                    <a href="#">Services</a>
                    <a id="signOutButton">Sign Out</a>
                `;
                const signOutButton = document.getElementById('signOutButton');
                signOutButton.addEventListener('click', userSignout);
            } else {
                // User is logged out
                navItemsContainer.innerHTML = `
                    <a href="#about">About Us</a>
                    <a href="#">Brgy Updates</a>
                    <a href="#">Services</a>
                    <a href="/Index.html">Login</a>
                    <a href="/Index.html">Signup</a>
                    <a href="/Index.html">Admin</a>
                `;
            }
        };



      // Add an event listener to the button
      dashboardButton.addEventListener('click', () => {
        // Redirect to dashboard.html
        window.location.href = 'newDashboard.html';
      });
      
                
                
                //signout
                const userSignout =async() => {
                            await signOut(auth);
                    }
                   
                    

                //tracks the user's st wether they are logged in or logged out
                const checkAuthState = async() => { 
                                onAuthStateChanged(auth, user => {
                                    updateNavItems(user);
                                    if(user){
                                      console.log("User is logged in");
                                        }
                                        else{
                                          console.log("user logged out");
                                        }
                                }) 
                            }

                            checkAuthState(); 



// function to store order
                     
                      buttons.forEach(button => {
                        button.addEventListener('click', async () => {
                          // Get the value of the clicked button
                          const buttonValue = button.getAttribute('data-value');
                          
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
                            status: 'pending', //  add a timestamp if needed
                          });          
                              // Redirect to the link associated with the button
                              const link = button.getAttribute('data-link');
                              if (link) {
                               // window.location.href = link;
                               console.log("you clicked" + link);
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
                        }); 
                      });
   

    
  
    