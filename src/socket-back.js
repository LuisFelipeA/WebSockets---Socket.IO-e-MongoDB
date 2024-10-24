import io from "./servidor.js";

const documentos = [
    {
        nome: "JavaScript",
        texto: "texto js..."
    },
    {
        nome: "Node",
        texto: "texto node..."
    },
    {
        nome: "Socket.io",
        texto: "texto Socket.Io..."
    }
];


//cria conexão
io.on("connection", (socket) => {
    console.log("Um cliente se conectou! ID: ",socket.id);

    // separa documentos por salas
    socket.on("selecionar_documento", (nomeDocumento) =>{
        socket.join(nomeDocumento);
        const documento = encontrarDocumento(nomeDocumento);
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
    const documento = documentos.find((documento) => {
        return documento.nome === nome;
    }) 
    return documento;
}

