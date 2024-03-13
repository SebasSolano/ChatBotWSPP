// Importación de la librería qrcode-terminal
const qrcode = require("qrcode-terminal");
const searchPersonByMail = require("./data/data");

// Obtener la clase de whatsapp-web.js
const { Client } = require("whatsapp-web.js");

// Inicializar la clase
const client = new Client();

// Variable para controlar el estado del flujo de conversacion
let conversationState = 0;

// Funcion para manejar los mensajes
client.on("message_create", async (message) => {
  console.log(message.body);

  switch (conversationState) {
    case 0:
      if (message.body === "!hola") {
        await message.reply(
          "Hola bienvenido, \n" +
            "Por favor ingresa tu correo electrónico! \n" +
            "Si deseas salir escribe: !salir"
        );
        conversationState++; // Avanzar al siguiente estado
      }
      break;

    case 1:
      const messageClient = message.body;
      const dataPerson = searchPersonByMail(messageClient);
      console.log(dataPerson);

      if (dataPerson === "ERROR") {
        await message.reply(
          dataPerson + "\nVuelve a digitar el correo electronico!"
        );
      } else {
        await message.reply(
          "Gracias por proporcionar tu correo electrónico " +
            dataPerson.fullName +
            ".\n" +
            "Si deseas salir escribe: !salir"
        );
        conversationState++;
      } // Avanzar al siguiente estado
      break;

    default:
      await message.reply("Si deseas salir escribe !salir");
      if (message.body === "!salir") {
        await message.reply("Gracias por utilizar el asistente!");
        conversationState = 0; // Reiniciar el estado al inicio
      }
      break;
  }
});

// Se crea un QR exclusivo para el cliente
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Confirmacion de conexion del cliente
client.on("ready", () => {
  console.log("Client is ready");
});

// Inicializar el cliente
client.initialize();
