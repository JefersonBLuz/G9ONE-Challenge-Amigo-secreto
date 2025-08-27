//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
//Variáveis Globais
const amigos = [];
let errorMessage = "";
const errorMessageElement = document.getElementById("error-message");
const resultado = document.getElementById("resultado");

//Eventos
document.addEventListener("DOMContentLoaded", () => {
  desabilitarBotaoSortear();
});

document.addEventListener("click", (event) => {
  desabilitarBotaoSortear();
});

//Funções
//Função para validar o nome do amigo
const nameValid = (name) => {
  if(name.trim() === ""){
    errorMessage = "Por favor, insira um nome.";
    return false;
  }
  if (amigos.includes(name.trim())) {
    errorMessage = "Nome já existe";
    return false;
  }
  return true;
};

//Função para adicionar o amigo na lista
const adicionarAmigo = () => {
  const name = document.getElementById("amigo").value;
  limparDados();
  if (nameValid(name)) {
    amigos.push(name);
    document.getElementById("amigo").value = "";
    listarAmigos();
    return;
  }
  errorMessageElement.textContent = errorMessage;
};

//Função para listar os amigos na lista
const listarAmigos = () => {
  const listaAmigos = document.getElementById("listaAmigos");
  listaAmigos.innerHTML = "";
  amigos.forEach((amigo, index) => {
    listaAmigos.innerHTML += `
      <tr>
        <td>${amigo}</td>
      </tr>
    `;
  });
};

//Função para sortear o amigo secreto
const sortearAmigo = () => {
  if (amigos.length > 1) {
    const amigoSorteado = amigos[Math.floor(Math.random() * amigos.length)];
    resultado.textContent = amigoSorteado;
  }
};

//Função para limpar os dados da lista
const limparDados = () => {
  errorMessageElement.textContent = "";
  resultado.textContent = "";
};

//Função para limpar a lista
const limparLista = () => {
  amigos.length = 0;
  listarAmigos();
  limparDados();
};

//Função para desabilitar o botão de sortear
const desabilitarBotaoSortear = () => {
  const buttonSortear = document.querySelector(".button-draw");
  if (amigos.length !== 0) {
    document.getElementById("table-container").classList.add("table-border");
  }else{
    document.getElementById("table-container").classList.remove("table-border");
  }
  if (amigos.length < 2) {
    buttonSortear.disabled = true;
  } else {
    buttonSortear.disabled = false;
  }
};