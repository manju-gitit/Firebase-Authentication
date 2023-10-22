
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";

( function (){
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
		apiKey: "",
		authDomain: "",
		databaseURL: "",
		projectId: "",
		storageBucket: "",
		messagingSenderId: "",
		appId: "",
		//measurementId: "G-PWBBC8GN6B"
    };
    // Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	const provider = new GoogleAuthProvider();

	console.log("app initialized...");

	// get elements
	const email    = document.getElementById('email');
	const password = document.getElementById('password');
	const login    = document.getElementById('login');
	const googlelogin    = document.getElementById('googlelogin');
	const loggedInStatus = document.getElementById("loggedInStatus");
	const signup   = document.getElementById('signup');
	const logout   = document.getElementById('logout');

	// login
	login.addEventListener('click', e => {
		signInWithEmailAndPassword(auth, email.value, password.value)
		.then((userCredential) => {
		  // Signed in
		  console.log(userCredential);
		})
		.catch((error) => {
		  console.log(error);
		});
	});
	// google login
	googlelogin.addEventListener('click', e => {
		signInWithPopup(auth, provider)
			.then((result) => {
		const credential = GoogleAuthProvider.credentialFromResult(result);
		const token = credential.accessToken;
		// The signed-in user info.
        const user = result.user;
        console.log("google user: ", user);
	})
	.catch((error) =>{ 
		// Handle Errors here.
		console.error(error);
	})
});
	// signup
	signup.addEventListener("click", (e) => {
		createUserWithEmailAndPassword(auth, email.value, password.value)
		  .then((userCredential) => {
			// Signed in
			console.log(userCredential);
		  })
		  .catch((error) => {
			console.log(error);
		  });
	  });

    // logout
	logout.addEventListener("click", (e) => {
		auth.signOut();
	});

    // login state
	auth.onAuthStateChanged(firebaseUser => {
		if (firebaseUser) {
			console.log(firebaseUser);
			loggedInStatus.innerText = `You are logged in using the following email: ${firebaseUser.email}`;
			logout.style.display = 'inline';
			login.style.display  = 'none';
			email.style.display = "none";
			googlelogin.style.display  = 'none';
			signup.style.display = 'none';
			password.style.display = "none";
		}
		else {
			console.log('User is not logged in');
			loggedInStatus.innerText = "You are not yet logged in";
			logout.style.display = 'none';			
			login.style.display  = 'inline';
			email.style.display = 'inline';
			password.style.display = 'inline';
			googlelogin.style.display  = 'inline';
			signup.style.display = 'inline';
		}
	});
})();



