import { atualizaTextoEditor } from "./documento.js";

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

export { emitirTextoEditor, selecionarDocumento };