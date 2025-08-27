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
  if (amigos.includes(formataNome(name))) {
    errorMessage = "Nome já existe";
    return false;
  }
  return true;
};

const formataNome = (name) => {
  const nameFormatted = name.trim().split(' ').map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()).join(' ');
  return nameFormatted;
};

//Função para adicionar o amigo na lista
const adicionarAmigo = () => {
  const name = document.getElementById("amigo").value;
  limparDados();
  if (nameValid(name)) {
    amigos.push(formataNome(name));
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
  const amigossorted = amigos.sort();
  amigossorted.forEach((amigo, index) => {
    listaAmigos.innerHTML += `
      <tr>
        <td class="col-nome">${index + 1} - ${amigo}</td>
        <td class="col-acoes">
          <div class="acoes-container">
            <a href="#" onclick="editarAmigo(${index})" class="editar" title="Editar">
              <iconify-icon icon="mdi:pencil-outline"></iconify-icon>
            </a>
            <a href="#" onclick="deletarAmigo(${index})" class="deletar" title="Deletar">
              <iconify-icon icon="mdi:trash-can-outline"></iconify-icon>
            </a>
          </div>
        </td>
      </tr>
    `;
  });
};

//Função para sortear o amigo secreto
const sortearAmigo = () => {
    const amigoSorteado = amigos[Math.floor(Math.random() * amigos.length)];
    resultado.innerHTML = `✨<span style="color: #000;">O nome do amigo secreto é:</span> ${amigoSorteado}!✨`;
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

const editarAmigo = (index) => {
  const amigo = amigos[index];
  const listaAmigosElement = document.getElementById("listaAmigos");
  const filhos = listaAmigosElement.children;
  const tdNome = filhos[index].children[0];
  const input = document.createElement("input");
  input.type = "text";
  input.value = amigo;
  input.className = "input-name";
  tdNome.textContent = "";
  tdNome.appendChild(input);
  input.focus();

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const novoNome = input.value.trim();
      if (nameValid(novoNome)) {
        amigos[index] = novoNome;
        limparDados();
        listarAmigos();
      } else {
        errorMessage = "Não foi possível editar o nome. "+ errorMessage;
        errorMessageElement.textContent = errorMessage;
      }
    } else if (event.key === "Escape") {
      listarAmigos();
    }
  });

  input.addEventListener("blur", () => {
    listarAmigos();
  });
};

const deletarAmigo = (index) => {
  limparDados();
  amigos.splice(index, 1);
  listarAmigos();
};