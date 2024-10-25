import { documentosColecao } from "./dbConnect.js";

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

export {encontrarDocumento, atualizaDocumento};