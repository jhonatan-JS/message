const net = require("net");

const porta = 3001;

// Criar um servidor de socket
const server = net.createServer((socket) => {
  console.log("Cliente conectado");

  // Enviar uma mensagem solicitando o nome
  socket.write("Olá! Qual é o seu nome?\n");

  let nomeCliente;

  // Lidar com mensagens do cliente
  socket.on("data", (message) => {
    if (!nomeCliente) {
      nomeCliente = message.toString().trim();
      console.log(`Cliente ${nomeCliente} conectado`);
      socket.write(`Olá, ${nomeCliente}! Bem-vindo ao servidor.\n`);
    } else {
      console.log(`${nomeCliente} diz: ${message.toString().trim()}`);
    }
  });

  // Lidar com a desconexão do cliente
  socket.on("close", () => {
    console.log(`Conexão com ${nomeCliente} fechada`);
  });
});

// Começar a escutar por novas conexões
server.listen(porta, () => {
  console.log(`Servidor executando na porta ${porta}`);
});
