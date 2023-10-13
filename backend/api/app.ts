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

app.post('/sendAudio', async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  try  {
   await clientInstance.sendVoice(phoneNumber + "@c.us", './public/cavalo.mp3').then((result: any) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro:any) => {
    console.error('Error when sending: ', erro); //return object error
  });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).send('Erro ao enviar mensagem');
  }
});

app.post('/sendAudio64', async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  try  {
    await clientInstance.sendVoiceBase64(phoneNumber + "@c.us","data:audio/mpeg;base64,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")
      .then((result: any) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro:any) => {
    console.error('Error when sending: ', erro); //return object error
  });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).send('Erro ao enviar mensagem');
  }
});


app.post('/sendContact', async (req: Request, res: Response) => {
  const { phoneNumber,contact,nameContact } = req.body;
  try  {
   await clientInstance.sendContactVcard(phoneNumber + "@c.us",contact + '@c.us', nameContact).then((result: any) => {
    console.log('Result: ', result); 
  })
  .catch((erro:any) => {
    console.error('Error when sending: ', erro); //return object error
  });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).send('Erro ao enviar mensagem');
  }
});

app.post('/sendListContacts', async (req: Request, res: Response) => {
  const { phoneNumber,contacts,nameContact } = req.body;
  try  {
   await clientInstance.sendContactVcardList(phoneNumber + "@c.us",contacts, nameContact).then((result: any) => {
    console.log('Result: ', result); 
  })
  .catch((erro:any) => {
    console.error('Error when sending: ', erro); //return object error
  });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).send('Erro ao enviar mensagem');
  }
});

app.post('/sendLocation', async (req: Request, res: Response) => {
  const { phoneNumber, coordX,coordY,country } = req.body;
  try  {
   await clientInstance.sendLocation(phoneNumber + "@c.us",coordX , coordY, country).then((result: any) => {
    console.log('Result: ', result); 
  })
  .catch((erro:any) => {
    console.error('Error when sending: ', erro); //return object error
  });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).send('Erro ao enviar mensagem');
  }
});

app.post('/sendLink', async (req: Request, res: Response) => {
  const { phoneNumber, link,alt } = req.body;
  try  {
   await clientInstance.sendLinkPreview(phoneNumber + "@c.us",link, alt).then((result: any) => {
    console.log('Result: ', result); 
  })
  .catch((erro:any) => {
    console.error('Error when sending: ', erro); //return object error
  });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).send('Erro ao enviar mensagem');
  }
});

app.post('/sendImage', async (req: Request, res: Response) => {
  const { phoneNumber, src, nameFile } = req.body;
  try  {
   await clientInstance.sendImage(phoneNumber + "@c.us", "./public/cavalo.jpeg" ,  nameFile).then((result: any) => {
    console.log('Result: ', result); 
  })
  .catch((erro:any) => {
    console.error('Error when sending: ', erro); //return object error
  });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).send('Erro ao enviar mensagem');
  }
});


app.post('/sendImage64', async (req: Request, res: Response) => {
  const { phoneNumber, baseImage64, nameFile } = req.body;
  try  {
   await clientInstance.sendImageFromBase64(phoneNumber + "@c.us", "data:image/jpeg;base64,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" ,  nameFile).then((result: any) => {
    console.log('Result: ', result); 
  })
  .catch((erro:any) => {
    console.error('Error when sending: ', erro); //return object error
  });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).send('Erro ao enviar mensagem');
  }
});
// app.post('/sendButtons', async (req: Request, res: Response) => {
//   const { phoneNumber } = req.body;



 
//   try {

// const buttons = [
//   {
//     buttonText: {
//       displayText: "Text of Button 1"
//       }
//     },
//   {
//     buttonText: {
//       displayText: "Text of Button 2"
//       }
//     }
//   ]

// await clientInstance.sendButtons('000000000000@c.us', 'Title', buttons, 'Description')
//   .then((result:any) => {
//     console.log('Result: ', result); //return object success
//   })
//   .catch((erro:any) => {
//     console.error('Error when sending: ', erro); //return object error
//   });

//       console.log('Número de telefone:', phoneNumber);
//     console.log(clientInstance);

//       res.send('Link enviada com sucesso');

//   } catch (error) {
//     console.error('Erro ao enviar mensagem:', error);
//     res.status(500).send('Erro ao enviar mensagem');
//   }
// });

app.get('/chats', async (req: Request, res: Response) => {


 try {
    const chats = await clientInstance.getAllChats();
     return res.send(chats);
  
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).send('Erro ao enviar mensagem');
  }
});

app.get('/chats/:number', async (req, res) => {
  try {
    const chatNumber = req.params.number;
    const allMessages = await clientInstance.getAllMessagesInChat(
      chatNumber + '@c.us'
    );


   
    return res.send(allMessages);
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    res.status(500).send('Erro ao buscar mensagens');
  }
});

app.get('/chats/all/:number', async (req, res) => {
  try {
    const chatNumber = req.params.number;
    const allMessages = await clientInstance.loadAndGetAllMessagesInChat(
      chatNumber + '@c.us'
    );


   
    return res.send(allMessages);
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    res.status(500).send('Erro ao buscar mensagens');
  }
});



 





app.listen(5000, () => {
  console.log("💥 Servidor iniciado na porta 5000");
});


