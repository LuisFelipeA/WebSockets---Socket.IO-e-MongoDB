import {MongoClient} from "mongodb";

const cliente =  new MongoClient("mongodb+srv://luis:1234@cluster0.gfgnl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

let documentosColecao;

try {
    await cliente.connect();

    const db = cliente.db("alura-websockets");
    documentosColecao =  db.collection("documentos");

    console.log("Conectado ao banco");
} catch (erro) {
    console.log(erro);
}

export {documentosColecao};