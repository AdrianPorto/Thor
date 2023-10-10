import express, { Request, Response } from "express";
const venom = require('venom-bot');

export const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let QRCODE = "";
let Status = "";
let clientInstance: any;

venom
  .create({
    session: 'session-name', // nome da sessão
    catchQR: (base64Qrimg: any, asciiQR: any, attempts: any, urlCode: any) => {
      QRCODE = base64Qrimg;
    },
    statusFind: (statusSession: any) => {
      Status = statusSession;
    },
    updatesLog: true,
  })
  .then((client: any) => {
    clientInstance = client;
    start(client);
  })
  .catch((error: any) => {
    console.log(error);
  });

function start(client: any) {
  client.onMessage((message: any) => {
    if (message.from === 'Teste' && message.isGroupMsg === false) {
      client
        .sendText(message.from, '...')
        .then((result: any) => {
          console.log('Result: ', result); // objeto de sucesso retornado
        })
        .catch((error: any) => {
          console.error('Erro ao enviar: ', error); // objeto de erro retornado
        });
    }

    
  });



}

app.get('/status', (req: Request, res: Response) => {
  return res.send({
    qr_code: QRCODE,
    connected: Status,
  });
});

app.post('/sendMessage', async (req: Request, res: Response) => {
  const { message, phoneNumber } = req.body;

  try {
    // Verifique se o cliente WhatsApp está pronto para enviar mensagens
   
      // Envie a mensagem usando o cliente WhatsApp
       clientInstance.sendText(phoneNumber + "@c.us", message);

      console.log('Mensagem enviada:', message);
      console.log('Número de telefone:', phoneNumber);
    // console.log(clientInstance);
      // Responda à solicitação com uma mensagem de confirmação ou o que for apropriado
      res.send('Mensagem enviada com sucesso');
    // } else {
    //   // Se o cliente não estiver conectado, retorne uma resposta indicando que o envio não é possível
    //   res.status(400).send('Cliente WhatsApp não está conectado');
    // }
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).send('Erro ao enviar mensagem');
  }
});

app.post('/sendButtons', async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;



 
  try {

    const buttons = [
  {

      displayText: "Text of eeeeeee 1"
      
    },

  ]

    clientInstance.sendButtons(phoneNumber, 'text', buttons, 'text')

      console.log('Número de telefone:', phoneNumber);
    console.log(clientInstance);

      res.send('Link enviada com sucesso');

  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).send('Erro ao enviar mensagem');
  }
});

app.get('/chats', async (req: Request, res: Response) => {


 try {
    const chats = await clientInstance.getAllChats();
     return res.send(chats);
  
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).send('Erro ao enviar mensagem');
  }
});




 





app.listen(5000, () => {
  console.log("💥 Servidor iniciado na porta 5000");
});


