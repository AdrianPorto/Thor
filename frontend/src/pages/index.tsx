import Image from "next/image";
import { Inter, Philosopher } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });
import { BsFillCheckCircleFill } from "react-icons/bs";
export default function Home() {
  const [qrcode, setQrcode] = useState("");
  const [connect, setConnect] = useState("");
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState(0);
  const [userPhotos, setUserPhotos] = useState<any>([]);
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
        const first5Items = response.data.slice(0, 5); // Pega os primeiros 5 itens
        const photos = []; // Crie uma matriz para armazenar as URLs das fotos

        for (let i = 0; i < first5Items.length; i++) {
          const item = first5Items[i];
          const profilePicUrl = item.contact.profilePicThumbObj.img;
          console.log(item);
          photos.push(profilePicUrl); // Adicione a URL da imagem à matriz 'photos'

          if (!profilePicUrl) {
            console.log(
              `Não há foto disponível para ${item.contact.shortName}`
            );
          }
        }

        setUserPhotos(photos); // Configure 'userPhotos' com a matriz completa de URLs de fotos
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
        const first5Items = response;
        console.log(first5Items);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    getAllMessagesChat();
  }, []);

  useEffect(() => {
    const getAllMessagesChats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/chats/all/554491756930"
        );
        const first5Items = response;
        console.log(first5Items);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    getAllMessagesChats();
  }, []);

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
    } catch (error) {
      console.error("Erro na requisição:", error);
    }

    try {
      const data = {
        phoneNumber: number,
        nameFile: "Cavalo",
      };
      await axios.post("http://localhost:5000/sendImage", data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }

    try {
      const data = {
        phoneNumber: number,

        nameFile: "Cavalo",
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
          <div className="">
            <div></div>
            <div></div>
          </div>
          <div className="flex flex-row space-x-[2vw]">
            <div className="rounded-[2vw] w-[250px] h-[450px] pl-[6px] pr-[6px] border-[#7E7E7E] border-[0.5px] bg-[#252525]">
              <div className="flex flex-row p-[20px] items-center border-b-[0.5px]  text-white text-[30px] w-full justify-center space-x-[80px]">
                <div>Chats</div>
                <div className="hover:bg-zinc-700 cursor-pointer p-[9px] text-[15px] rounded-full">
                  <FaSearch></FaSearch>
                </div>
              </div>
              <div>
                <div className="flex flex-col  mt-[20px] ">
                  {userPhotos &&
                    userPhotos.map((photoUrl: any, index: any) => (
                      <img
                        className="flex rounded-full shadow-sm w-[50px]  shadow-zinc-300 overflow-hidden  select-none"
                        key={index}
                        src={photoUrl}
                        alt={`Foto ${index}`}
                      />
                    ))}
                </div>
              </div>
            </div>
            <div className="rounded-[2vw] w-[970px] h-[450px] border-[#7E7E7E] border-[0.5px] bg-[#252525]"></div>
          </div>
        </div>
      )}
        
    </main>
  );
}
