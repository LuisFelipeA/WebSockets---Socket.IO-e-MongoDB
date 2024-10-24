import io from "./servidor.js";

//cria conexão
io.on("connection", (socket) => {
    console.log("Um cliente se conectou! ID: ",socket.id);

    // separa documentos por salas
    socket.on("selecionar_documento", (nomeDocumento) =>{
        socket.join(nomeDocumento);
    }); 

    //envia informações para o frontend
    socket.on("texto_editor", ({texto, nomeDocumento}) => {
        socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
    });
});