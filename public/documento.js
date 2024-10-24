import { emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search); //pega url
const nomeDocumento = parametros.get("nome"); //chave nome da url

const textoEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento"); //acessa pelo id do html

tituloDocumento.textContent = nomeDocumento || "Documento sem título"; // altera titulo

selecionarDocumento(nomeDocumento);

// ao soltar uma tecla, chama a função
textoEditor.addEventListener("keyup", () => {
    emitirTextoEditor({
        texto: textoEditor.value, 
        nomeDocumento: nomeDocumento});
});

function atualizaTextoEditor(texto) {
    textoEditor.value = texto;
}

export { atualizaTextoEditor };