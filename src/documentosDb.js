import { documentosColecao } from "./dbConnect.js";

function obterDocumentos() {
    const documentos = documentosColecao.find().toArray();
    return documentos
}

function encontrarDocumento(nome) {
    const documento = documentosColecao.findOne({
        nome: nome
    });
    return documento;
}

function adicionarDocumento(nome) {
    const resultado = documentosColecao.insertOne({nome: nome, texto: ""});
    return resultado;
}

function excluirDocumento(nome) {
    const resultado = documentosColecao.deleteOne({ nome: nome });
    return resultado;
}

function atualizaDocumento(nome, texto) {
    const atualizacao = documentosColecao.updateOne({
        nome: nome
    }, {
        $set: {
            texto: texto
        }
    });
    
    return atualizacao;
}

export {encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento};