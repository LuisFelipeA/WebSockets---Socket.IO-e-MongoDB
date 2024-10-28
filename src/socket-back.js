import { encontrarDocumento, atualizaDocumento,obterDocumentos, adicionarDocumento} from "./documentosDb.js";
import io from "./servidor.js";

//cria conexão
io.on("connection", (socket) => {
    socket.on("obter_documentos", async (devolverDocumentos) =>{
        const documentos = await obterDocumentos();
        devolverDocumentos(documentos);
    });

    socket.on("adicionar_documento", async (nome) => {
        const resultado = await adicionarDocumento(nome);
        if (resultado.acknowledged) {
            io.emit("adicionar_documento_interface", nome);
        }
    });

    // separa documentos por salas
    socket.on("selecionar_documento", async (nomeDocumento) =>{
        socket.join(nomeDocumento);
        const documento = await encontrarDocumento(nomeDocumento);
        if (documento) {
            socket.emit("texto_documento", documento.texto); //enviando texto para o frontend
        }
    }); 

    //envia informações para o frontend
    socket.on("texto_editor", async ({texto, nomeDocumento}) => {
        const documento = await atualizaDocumento(nomeDocumento, texto);
        if (documento) {
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }
    });


});
