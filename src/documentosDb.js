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

export {encontrarDocumento, atualizaDocumento, obterDocumentos};