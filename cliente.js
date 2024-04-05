const net = require("net");
const readline = require("readline");

const client = net.createConnection({
  host: "localhost",
  port: 3001,
});

const leitor = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Lidar com mensagens do servidor
client.on("data", (mensagem) => {
  console.log("Mensagem recebida do servidor:", mensagem.toString("utf8"));
});

// Lidar com a desconexão do servidor
client.on("close", () => {
  console.log("Conexão fechada");
});

leitor.on("line", (input) => {
  client.write(input);
});

leitor.on("close", () => {
  client.end();
});
