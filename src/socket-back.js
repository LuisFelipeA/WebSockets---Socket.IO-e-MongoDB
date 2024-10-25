import { documentosColecao } from "./dbConnect.js";
import io from "./servidor.js";

//cria conexão
io.on("connection", (socket) => {
    console.log("Um cliente se conectou! ID: ",socket.id);

    // separa documentos por salas
    socket.on("selecionar_documento", async (nomeDocumento) =>{
        socket.join(nomeDocumento);
        const documento = await encontrarDocumento(nomeDocumento);
        if (documento) {
            socket.emit("texto_documento", documento.texto); //enviando texto para o frontend
        }
    }); 

    //envia informações para o frontend
    socket.on("texto_editor", ({texto, nomeDocumento}) => {
        const documento = encontrarDocumento(nomeDocumento);
        if (documento) {
            documento.texto = texto
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }
    });
});

function encontrarDocumento(nome) {
    const documento = documentosColecao.findOne({
        nome: nome
    });
    return documento;
}

