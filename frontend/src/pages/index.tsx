import Image from "next/image";
import { Inter, Philosopher } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";

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

          photos.push(profilePicUrl); // Adicione a URL da imagem à matriz 'photos'

          if (profilePicUrl) {
            console.log(`Foto do ${item.name}: ${profilePicUrl}`);
          } else {
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

  const sendMessage = async () => {
    const data = {
      phoneNumber: number,
    };
    try {
      await axios.post("http://localhost:5000/sendMessage", data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }

    try {
      await axios.post("http://localhost:5000/sendButtons", data);
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
        <div className="flex flex-col">
          <div>Numero</div>
          <input
            className="w-[500px] bg-zinc-900 h-[50px] rounded-[20px] p-[10px]
              "
            onChange={(e) => {
              setNumber(parseInt(e.target.value));
            }}
          ></input>

          <div>
            <div>Message</div>
            <textarea
              className="w-[500px] bg-zinc-900 h-[50px] rounded-[20px] p-[10px]
              "
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="mt-[20px]">
            <button
              className="flex w-full bg-green-600 p-[10px]  rounded-[20px] justify-center text-[20px] "
              onClick={() => {
                sendMessage();
              }}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-row justify-center items-center space-x-[-20px] mt-[40px]">
        {userPhotos &&
          userPhotos.map((photoUrl: any, index: any) => (
            <img
              className="flex rounded-full shadow-sm shadow-zinc-300 overflow-hidden  select-none"
              key={index}
              src={photoUrl}
              alt={`Foto ${index}`}
            />
          ))}
      </div>
        
    </main>
  );
}
