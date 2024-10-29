import { inserirLinkDocumento, removerLinkDocumento } from "./index.js";

const socket = io();

socket.emit("obter_documentos", (documentos) => {
    documentos.forEach((documento) => {
        inserirLinkDocumento(documento.nome);
    })
});

function emitirAdicionarDocumento (nome) {
    socket.emit("adicionar_documento", nome)
}

socket.on("adicionar_documento_interface", (nome) =>{
    inserirLinkDocumento(nome)
});

socket.on("documento_existente", (nome) =>{
    alert(`O documento ${nome} ja existe!`);
})

socket.on("excluir_documento_sucesso", (nome) =>{
    console.log("124")
    removerLinkDocumento(nome);
})

export {emitirAdicionarDocumento};