import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [qrcode, setQrcode] = useState("");

  useEffect(() => {
    axios
      .get("https://fuzzy-barnacle-wj79rp6gvg4f775-5000.app.github.dev/status")
      .then((response) => {
        setQrcode(response.data);
      })
      .catch((error) => {
        // Lidar com erros de requisição, se necessário
        console.error("Erro na requisição:", error);
      });
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <img src={qrcode}></img>
    </main>
  );
}
