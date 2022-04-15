// configuraçao do app web do firebase
firebase.initializeApp({
    apiKey: "AIzaSyBizWvDOG-_DjuuiNbcMje-J8cOsOHNcZ0",
    authDomain: "projeto-integrador-3efa7.firebaseapp.com",
    projectId: "projeto-integrador-3efa7"
});


//inicia o firebase
const database = firebase.firestore();

// funçao de autenticaçao, se logado permite continuar na pagina, se nao tiver login
// redireciona para a pagina de login
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User esta logado, pode permanecer na pagina
        var uid = user.uid;
        console.log("Usuário conectado = ", user.uid);
    } else {
        // usuario sem login, logo sera redirecionado
        // ...
        alert("Voce não está logado");
        window.location.href = "login.html";
    }
});

// funçao ver dados, envia os dados do bd para o console
function read() {
    var userRef = database.collection("user");
    var query = userRef.where("email", "!=", null);
    database.collection("user").where("email", "!=", null)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch((error) => {
            console.log("Erro ao tentar ler os documentos", error);
        });
}

//funçao salvar
function save() {
    var email = document.getElementById('email').value
    var name = document.getElementById('name').value
    var cep = document.getElementById('cep').value
    var cpf = document.getElementById('cpf').value
    var number = document.getElementById('number').value

    database.collection("user").add({
        email: email,
        name: name,
        cep: cep,
        cpf: cpf,
        describe: describe,
        number: number,
    })
        .then((docRef) => {
            console.log("Documento escrito com id: ", docRef.id);
        })
        .catch((error) => {
            console.error("Erro ao tentar escrever: ", error);
        });

}

//funçao update/atualiza
function update(){
    var uid = document.getElementById('uid').value
    var email = document.getElementById('email').value
    var name = document.getElementById('name').value
    var cep = document.getElementById('cep').value
    var cpf = document.getElementById('cpf').value
    var number = document.getElementById('number').value

    var dbRef = database.collection("user").doc(uid);

    return dbRef.update({
        email: email,
        name: name,
        cep: cep,
        cpf: cpf,
        describe: describe,
        number: number,
    })
        .then(() => {
            console.log("Documento atualizado com sucesso!");
        })
        .catch((error) => {
            // O documento provavelmente não existe.
            console.error("Erro ao tentar atualizar o documento", error);
        });
}

//funçao remover, pode ser ajustada para remover qualquer campo do documento usuario/uid
function removepost() {
    var r = confirm("Deseja continuar?")
    var uid = document.getElementById('uid').value
    if (r == true) {
        var userRef = database.collection('user').doc(uid);
        var removepost = userRef.update({
            post: firebase.firestore.FieldValue.delete()
        });
        alert('Post excluido com sucesso')
    } else {
        x = "Voce optou por cancelar"
    }
}

function removeerro() {
    var r = confirm("Deseja continuar?")
    var uid = document.getElementById('uid').value
    database.collection("user").doc(uid).subcollection("post").delete().then(() => {
        console.log("post deletado com sucesso!");
    }).catch((error) => {
        console.error("Erro ao tentar excluir documento: ", error);
    });
}

//funçaõ utilizada para remover o usuário
function removeuid(){
    var uid = document.getElementById('uid').value
    database.collection("user").doc(uid).delete().then(() => {
        console.log("Usuario deletado com sucesso!");
    }).catch((error) => {
        console.error("Erro ao tentar excluir documento: ", error);
    });
}



// funçao logout ou sair, serve basicamente para sair da pagina
function logout() {
    var r = confirm("Deseja continuar?")
    if (r == true) {
        firebase.auth().signOut().then(() => { 
            window.location.href = "login.html";
            // Sign-out successful.
            alert('Logout com sucesso')
        })
    } else {
        x = "Voce optou por cancelar"
    }
}