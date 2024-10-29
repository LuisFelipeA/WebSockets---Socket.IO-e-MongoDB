import { atualizaTextoEditor, alertERedirecionar } from "./documento.js";

const socket = io(); // cria instancia do socket.io

function selecionarDocumento(nome) {
    socket.emit("selecionar_documento", nome); //envia informação para o backend
}

function emitirTextoEditor(dados) {
    socket.emit("texto_editor", dados); //envia informação para o backend
}

//recebendo texto do backend
socket.on("texto_documento", (texto) => {
    atualizaTextoEditor(texto);
});

// recebe informação do backend
socket.on("texto_editor_clientes", (texto) => {
    atualizaTextoEditor(texto);
});

function emitirExcluirDocumento (nome) {
    socket.emit("excluir_documento", nome);
}

socket.on("documento_não_existente", (nome) =>{
    alert(`O documento ${nome} não existe!`);
    window.location.href = "/";
})

socket.on("excluir_documento_sucesso", (nome) => {
    alertERedirecionar(nome);
});

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };