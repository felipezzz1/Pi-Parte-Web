// Configuração do banco de dados
firebase.initializeApp({
  apiKey: "AIzaSyBizWvDOG-_DjuuiNbcMje-J8cOsOHNcZ0",
  authDomain: "projeto-integrador-3efa7.firebaseapp.com",
  projectId: "projeto-integrador-3efa7"
});


//iniciar o firebase
const database = firebase.firestore();

// inicia as variáveis
const auth = firebase.auth()

//função entrar com senha, le email e senha inseridos
//se corretos e permitidos faz o login e passa para a próxima tela
function signInWithEmailPassword() {
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value

  if (email == "felipe@admin.com" || email== "joaopieczarka@gmail.com" || email == "rafael.carriel.deo@gmail.com" ) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // logado
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
  }else{
    alert("Voce não é autorizado a fazer login");
  }
}