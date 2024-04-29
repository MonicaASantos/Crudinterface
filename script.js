function modalOpen() {
    document.getElementById('modal').classList.add('active');
    document.querySelector("h2").innerText = "Novo usuário";
    document.getElementById("saveValues").innerText = "Salvar";
}

function modalClose() {
    document.getElementById('modal').classList.remove('active');
}

document.getElementById('userRegistration').addEventListener('click', modalOpen)
document.getElementById('modalClose').addEventListener('click', modalClose)

function addUser() {
    let listUser = [];

    const id = Math.floor(Math.random() * 100);
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cel = document.getElementById('cel').value;
    const city = document.getElementById('city').value;

    const objUser = {
        idUser: id,
        nomeUser: nome,
        emailUser: email,
        celUser: cel,
        cityUser: city,
    }

    if (localStorage.getItem('CadastroUsuarios')) {
        listUser = JSON.parse(localStorage.getItem('CadastroUsuarios'));
    }

    listUser.push(objUser);

    localStorage.setItem("CadastroUsuarios", JSON.stringify(listUser));

    modalClose();

    window.location.reload();

    //document.getElementById('saveValues').addEventListener('click', modalClose())

}

document.getElementById('saveValues').addEventListener('click', addUser);
// função para carregar os dados de usuário
function carregarUsuario() {
    let listUser = [];

    if (localStorage.getItem("CadastroUsuarios")) {
        listUser = JSON.parse(localStorage.getItem("CadastroUsuarios"));
    }

    if (listUser.length === 0) {
        let tabela = document.getElementById("corpotabela");
        tabela.innerHTML = `
    <tr>
        <td colpsan ='5'>Nenhum usuário cadastrado </td>
        </tr>
    `

    } else {
        createTableUser(listUser);
    }

}
window.addEventListener('DOMContentLoaded', carregarUsuario);

function createTableUser(dadoUsuario) {

    let tabela = document.getElementById('corpoTabela');

    let template = '';

    dadoUsuario.forEach(user => {
        template += `
    <tr>
     <td> ${user.nomeUser} </td>
     <td> ${user.emailUser} </td>
     <td> ${user.celUser} </td>
     <td> ${user.cityUser} </td>
     <td>
     <button type="button" class="button green">Editar</button>
     <button type="button" class="button red"onclick="deleteUser(${user.idUser})">Excluir</button>
 </td>

     </tr>
    
    `
    });

    tabela.innerHTML = template;

}
function updateUser(id) {
    document.getElementById("saveValues").removeEventListener("click", addUser);
    modalOpen();

    const textTitleUpdateUser = document.querySelector("h2");
    textTitleUpdateUser.innerText = "Atualizar";

    document.getElementById("saveValues").innerText = "Atualizar";

    const getUserData = JSON.parse(localStorage.getItem("CadastroUsuarios"));

    const userData = getUserData.find(identificarUsuarios => identificarUsuarios.idUser === id);

    document.getElementById("name").value = userData.nameUser;
    document.getElementById("email").value = userData.emailUser;
    document.getElementById("cel").value = userData.celUser;
    document.getElementById("city").value = userData.cityUser;

    document.getElementById("saveValues").addEventListener("click", function () {
        updateUserInfo(id);
    });
}

function updateUserInfo(id) {
    const newName = document.getElementById("name").value;
    const newEmail = document.getElementById("email").value;
    const newCel = document.getElementById("cel").value;
    const newCity = document.getElementById("city").value;

    const userList = JSON.parse(localStorage.getItem("CadastroUsuarios") || []);

    const userIndexFind = userList.findIndex(user => user.idUser === id);

    if (userIndexFind !== -1) {
        userList[userIndexFind].nameUser = newName;
        userList[userIndexFind].emailUser = newEmail;
        userList[userIndexFind].celUser = newCel;
        userList[userIndexFind].cityUser = newCity;

        localStorage.setItem("CadastroUsuarios", JSON.stringify(userList));

        console.log(userList);
    }
}

function deleteUser(id) {

    alert(id)

    let userList = JSON.parse(localStorage.getItem("CadastroUsuarios")) || [];

    const findIndex = userList.findIndex((user) => user.idUser === id);

    console.log(findIndex)

    if (findIndex !== -1) {

        userList.splice(findIndex, 1);
        localStorage.setItem("CadastroUsuarios", JSON.stringify(userList));
        window.location.reload(); // Recarrega a página para refletir a exclusão
    }
}

