//Initialize Firebase
var config = {
  apiKey: "AIzaSyAG6VVvCdUj-kzNlLHflPh3dhEfx90G6eA",
  authDomain: "countriesdb-ed015.firebaseapp.com",
  databaseURL: "https://countriesdb-ed015.firebaseio.com",
  projectId: "countriesdb-ed015",
  storageBucket: "",
  messagingSenderId: "749460144689"
};
firebase.initializeApp(config);

function logIn()
{
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result){

    alert("Sign In Successful! Google Account Linked");

  }).catch(function(err){
    alert("Sign in failed");
    //alert(err);
  })

}
function logOut()
{
    //here you implements the log out
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    alert("Successfully signed out of account");
    }).catch(function(error) {
    // An error happened.
    alert("An error occured while signing out\nPlease refresh page");
    });
}

//Note: saveCountry and gettingCountry aren't complete yet

function saveCountry()
{
    //here you can implements the code saving the name of the country you type.
    //note: the variable with the input element calls "info"

  //Updates country value in firebase after click
  firebase.database().ref().child("country").set(info.value);
}

function gettingCountry()
{
    //here you can implements the code you get the name of the countries in your firebase realtime database.
    //notes: don't forget to call the function "displayMessages(key,text)" with the right parameters
    //otherWise the site won't show the countries
    //another note: you have to call the firebase listener always ON change and ON add of an item.

    //Just a test to show stored country in header
    var bigOne = document.getElementById('bigOne');
    var dbRef = firebase.database().ref().child('country');
    dbRef.on('value', snap => bigOne.innerText = ("Current country in db: " + snap.val()));

}




//auxiliar functions try take a look if you get what happens

function authStateObserver(user) {
    if (user) { // User is signed in!
      // Get the signed-in user's profile pic and name.
      var profilePicUrl = getProfilePicUrl();
      var userNameLocal = getUserName();

      // Set the user's profile pic and name.
      if(profilePicUrl){
        userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
        userPic.removeAttribute('hidden');
      }
      userName.value= userNameLocal;

      // Show user's profile and sign-out button.
      userName.removeAttribute('hidden');

      out.removeAttribute('hidden');

      // Hide sign-in button.
      inn.setAttribute('hidden', 'true');

    } else { // User is signed out!
      // Hide user's profile and sign-out button.
      userName.setAttribute('hidden', 'true');
      userPic.setAttribute('hidden', 'true');
      out.setAttribute('hidden', 'true');

      // Show sign-in button.
      inn.removeAttribute('hidden');
    }
  }


  function initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(authStateObserver);
  }

  // Returns the signed-in user's profile Pic URL.
  function getProfilePicUrl() {
    return firebase.auth().currentUser.photoURL;
  }

  // Returns the signed-in user's display name.
  function getUserName() {
    return firebase.auth().currentUser.displayName;
  }

  // Returns true if a user is signed-in.
  function isUserSignedIn() {
    return !!firebase.auth().currentUser;
  }

  function displayMessage(key, text) {
    var container = document.getElementById(key);
    // If an element for that message does not exists yet we create it.
    if (!container) {
      container = document.createElement('li');
      container.setAttribute('id', key);
      container.setAttribute('class',"collection-item");
      collection.appendChild(container);
    }
    container.innerText = text;

  }

//getting pages elements
var userPic = document.getElementById('pic');
var userName = document.getElementById('nome');
var signInBtn = document.getElementById('login-button');
var signOutBtn = document.getElementById('logout-button');
var collection = document.getElementById('myout');
var send = document.getElementById("send-button");
var info = document.getElementById("country_in");
var inn = document.getElementById("in");
var out = document.getElementById('out');

//adding listeners
signInBtn.addEventListener('click',logIn);
signOutBtn.addEventListener('click',logOut);
send.addEventListener("click", saveCountry);
//calling functions that are listeners
initFirebaseAuth();

gettingCountry();
