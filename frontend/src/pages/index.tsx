import Image from "next/image";
import { Inter, Philosopher } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaMicrophone,
  FaPaperPlane,
  FaPaperclip,
  FaSearch,
} from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });
import { BsFillCheckCircleFill } from "react-icons/bs";
import ListChats from "@/components/List/ListChats";
import Chat from "@/components/Chats";
export default function Home() {
  const [qrcode, setQrcode] = useState("");
  const [connect, setConnect] = useState("");
  const [show, setShow] = useState(true);
  const [messages, setMessages] = useState("");
  const [Idchat, setIdChat] = useState<any>(-1);
  const [userPhotos, setUserPhotos] = useState<any>([]);
  const [chats, setChats] = useState([
    {
      nome: "",
      mensagem: "",
      fotoPerfil: "",
      numero: 0,
    },
  ]);

  useEffect(() => {
    let isRunning = true;

    const getStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/status");

        if (isRunning) {
          setQrcode(response.data.qr_code);
          setConnect(response.data.connected);

          if (response.data.connected === "successChat") {
            clearInterval(intervalId);
            setTimeout(() => {
              setShow(false); // Define a variável como false após 5 segundos
            }, 5000);
          }
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    getStatus();

    const intervalId = setInterval(getStatus, 200);

    return () => {
      isRunning = false;
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/chats");
        const first5Items = response.data.slice(0, 10);

        const photos = [];
        const chatData = []; // Crie um array para armazenar os dados dos chats

        for (let i = 0; i < first5Items.length; i++) {
          const item = first5Items[i];
          const profilePicUrl = item.contact.profilePicThumbObj.img;
          photos.push(profilePicUrl);

          if (!profilePicUrl) {
            console.log(
              `Não há foto disponível para ${item.contact.shortName}`
            );
          }

          // Preencha o array 'chatData' com os dados de cada chat
          chatData.push({
            nome:
              item.contact.name === null || item.contact.name === undefined
                ? item.id.user
                : item.contact.name,
            mensagem: item.últimaMensagem,
            fotoPerfil: profilePicUrl,
            numero: item.id.user,
          });
        }

        // Atualize o estado 'chats' com o array de dados dos chats
        setChats(chatData);

        setUserPhotos(photos);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    getChats();
  }, []);

  // useEffect(() => {
  //   const getAllMessagesChats = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5000/chats/all/554491756930"
  //       );
  //     } catch (error) {
  //       console.error("Erro na requisição:", error);
  //     }
  //   };'

  //   getAllMessagesChats();
  // }, []);

  useEffect(() => {
    const getAllMessagesChat = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/chats/${chats[Idchat].numero}`
        );

        setMessages(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    getAllMessagesChat();
  }, [Idchat]);

  return (
    <main
      className={
        "flex min-h-screen flex-col items-center  justify-center ${inter.className}"
      }
    >
      {show == true ? (
        <>
          {connect === "notLogged" ? (
            <>
              {qrcode !== "" ? (
                <>
                  <img
                    src={qrcode}
                    className="p-[20px] bg-white rounded-[10px]"
                  ></img>
                </>
              ) : (
                <div>Gerando o QRCode...</div>
              )}
            </>
          ) : (
            <div className="flex flex-row justify-center items-center space-x-[10px]">
              <BsFillCheckCircleFill className="text-[30px] text-green-500"></BsFillCheckCircleFill>
              <div>Conectado com sucesso!</div>
            </div>
          )}
        </>
      ) : (
        // <div className="flex flex-col space-y-[10px]">
        //   <div>Numero</div>
        //   <input
        //     className="w-[500px] bg-zinc-900 h-[50px] rounded-[20px] p-[10px]
        //       "
        //     onChange={(e) => {
        //       setNumber(parseInt(e.target.value));
        //     }}
        //   ></input>

        //   <div>
        //     <div className="mb-[20px]">Messagem</div>
        //     <textarea
        //       className="w-[500px] bg-zinc-900 h-[50px] rounded-[20px] p-[10px]
        //       "
        //       onChange={(e) => {
        //         setMessage(e.target.value);
        //       }}
        //     ></textarea>
        //   </div>
        //   <div className="mt-[20px]">
        //     <button
        //       className="flex w-full bg-green-600 p-[10px]  rounded-[20px] justify-center text-[20px] "
        //       onClick={() => {
        //         sendMessage();
        //       }}
        //     >
        //       Enviar
        //     </button>
        //   </div>

        // </div>

        <div>
          <div className="flex justify-end space-x-[20px] items-center mb-[10px]">
            <div className="w-[50px] h-[50px]  rounded-[10px]  bg-white "></div>
            <div className="w-[50px] h-[50px]  rounded-[10px] bg-white "></div>
            <div className="w-[80px] h-[80px] bg-white rounded-full "></div>
          </div>
          <div className="flex flex-row space-x-[2vw]">
            <ListChats chats={chats} setIdChat={setIdChat}></ListChats>
            <Chat Idchat={Idchat} chats={chats} messages={messages}></Chat>
          </div>
        </div>
      )}
        
    </main>
  );
}
