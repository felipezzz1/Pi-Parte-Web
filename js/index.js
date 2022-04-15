// Your web app's Firebase configuration
firebase.initializeApp({
  apiKey: "AIzaSyBizWvDOG-_DjuuiNbcMje-J8cOsOHNcZ0",
  authDomain: "projeto-integrador-3efa7.firebaseapp.com",
  projectId: "projeto-integrador-3efa7"
});


//initialize firebase
const database = firebase.firestore();


// Initialize variables
const auth = firebase.auth()

function signInWithEmailPassword() {
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value

  if (email == "felipe@admin.com" || email== "joaopieczarka@gmail.com" || email == "rafael.carriel.deo@gmail.com" ) {
    // [START auth_signin_password]
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        alert("Logado com sucesso");
        window.location.href = "alterar.html";
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Senha ou email incorretos");
      });
    // [END auth_signin_password]
  }else{
    alert("Voce não é autorizado a fazer login");
  }
}