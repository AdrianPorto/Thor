import Image from "next/image";
import { Inter, Philosopher } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";

const inter = Inter({ subsets: ["latin"] });
import { BsFillCheckCircleFill } from "react-icons/bs";
export default function Home() {
  const [qrcode, setQrcode] = useState("");
  const [connect, setConnect] = useState("");
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState(44988609457);
  const [userPhotos, setUserPhotos] = useState<any>([]);
  const [chats, setChats] = useState([
    {
      nome: "",
      mensagem: "",
      fotoPerfil: "",
    },
  ]);
  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/status");
        setQrcode(response.data.qr_code);
        setConnect(response.data.connected);

        if (response.data.connected === "successChat") {
          clearInterval(intervalId);

          setTimeout(() => {
            setShow(false); // Define a variável como false após 5 segundos
          }, 5000);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
    getStatus();

    const intervalId = setInterval(getStatus, 5000);

    return () => clearInterval(intervalId);
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
            nome: item.contact.name,
            mensagem: item.últimaMensagem,
            fotoPerfil: profilePicUrl,
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

  useEffect(() => {
    console.log("teste");
    const getAllMessagesChat = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/chats/554491756930"
        );

        console.log(response);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    getAllMessagesChat();
  });

  // useEffect(() => {
  //   const getAllMessagesChats = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5000/chats/all/554491756930"
  //       );
  //     } catch (error) {
  //       console.error("Erro na requisição:", error);
  //     }
  //   };

  //   getAllMessagesChats();
  // }, []);

  const sendMessage = async () => {
    try {
      const data = {
        phoneNumber: number,
        message: message,
      };
      await axios.post("http://localhost:5000/sendMessage", data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
    // const dataButton = {
    //   phoneNumber: number,
    //   message: message,
    // };
    // try {
    //   await axios.post("http://localhost:5000/sendButtons");
    // } catch (error) {
    //   console.error("Erro na requisição:", error);
    // }

    try {
      const data = {
        phoneNumber: number,
      };
      await axios.post("http://localhost:5000/sendAudio", data);
    } catch (error) {}

    try {
      const data = {
        phoneNumber: number,
      };
      await axios.post("http://localhost:5000/sendImage", data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }

    try {
      const data = {
        phoneNumber: number,
      };
      await axios.post("http://localhost:5000/sendImage64", data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  console.log(connect !== "successChat");
  console.log(connect);

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
            <div className="rounded-[2vw] w-[250px] h-[510px] pl-[6px]   overflow-hidden  border-[#7E7E7E] border-[0.5px] bg-[#252525]">
              <div
                className="flex flex-row p-[20px] items-center border-b-[0.5px] w-[234px]
                border-[#ABABAB]   text-white text-[30px]  justify-center space-x-[80px]"
              >
                <div>Chats</div>
                <div className="hover:bg-zinc-700 cursor-pointer p-[9px] text-[15px] rounded-full">
                  <FaSearch></FaSearch>
                </div>
              </div>
              <div className="scroll-container scroll-content   h-[83.9%]  flex flex-1 ">
                <div className="flex flex-col    flex-1   ">
                  {chats.map((chat, index) => (
                    <div className="flex flex-row space-x-[20px] border-b-[0.5px] border-[#ABABAB] p-[15px] m-0">
                      <img
                        src={chat.fotoPerfil}
                        className="flex rounded-full  w-[60px]  overflow-hidden select-none"
                        alt={`Foto de ${chat.nome}`}
                      />

                      <div>
                        <div className="w-[120px]  text-[15px]">
                          {chat.nome}
                        </div>
                        {chat.mensagem}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-[2vw] w-[970px] h-[510px] p-[10px] border-[#7E7E7E] border-[0.5px] bg-[#252525]">
              <div className="flex w-full border-b h-[75px]   border-[#7E7E7E]">
                <div className="flex flex-row">
                  <div className="flex flex-row space-x-[20px]   p-[10px]">
                    <img
                      src={chats[0].fotoPerfil}
                      className="flex rounded-full  w-[50px]  overflow-hidden select-none"
                    />
                    <div className="flex flex-col">
                      <div>{chats[0].nome}</div>
                      <div className="text-[10px] mt-[3px] text-green-600">
                        Online
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" flex flex-1 w-full text-[30px]  justify-end items-center">
                  <CiMenuKebab onClick={sendMessage}></CiMenuKebab>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        
    </main>
  );
}
