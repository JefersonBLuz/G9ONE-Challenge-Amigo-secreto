//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
//Variáveis Globais
const amigos = [];
let errorMessage = "";
const resultado = document.getElementById("resultado");



//Funções

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

const adicionarAmigo = () => {
  const name = document.getElementById("amigo").value;
  resultado.textContent = "";
  if (nameValid(name)) {
    amigos.push(name);
    document.getElementById("amigo").value = "";
    listarAmigos();
    return;
  }
  alert(errorMessage);
};

const listarAmigos = () => {
  const listaAmigos = document.getElementById("listaAmigos");
  listaAmigos.innerHTML = "";
  amigos.forEach((amigo) => {
    const li = document.createElement("li");
    li.textContent = amigo;
    listaAmigos.appendChild(li);
  });
};

const sortearAmigo = () => {
  if (amigos.length > 1) {
    const amigoSorteado = amigos[Math.floor(Math.random() * amigos.length)];
    resultado.textContent = amigoSorteado;
  }
};
