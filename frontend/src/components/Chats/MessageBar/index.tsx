import axios from "axios";
import React, { useState } from "react";
import {
  FaMicrophone,
  FaPaperPlane,
  FaPaperclip,
  FaSearch,
} from "react-icons/fa";

// import { Container } from './styles';

interface Props {
  number: any;
}
const MessageBar: React.FC<Props> = ({ number }) => {
  const [message, setMessage] = useState("");

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
    //  const dataButton = {
    //    phoneNumber: number,
    //    message: message,
    //  };
    //  try {
    //    await axios.post("http://localhost:5000/sendButtons");
    //  } catch (error) {
    //    console.error("Erro na requisição:", error);
    //  }
    // try {
    //   const data = {
    //     phoneNumber: number,
    //   };
    //   await axios.post("http://localhost:5000/sendAudio", data);
    // } catch (error) {}
    // try {
    //   const data = {
    //     phoneNumber: number,
    //   };
    //   await axios.post("http://localhost:5000/sendImage", data);
    // } catch (error) {
    //   console.error("Erro na requisição:", error);
    // }
    // try {
    //   const data = {
    //     phoneNumber: number,
    //   };
    //   await axios.post("http://localhost:5000/sendImage64", data);
    // } catch (error) {
    //   console.error("Erro na requisição:", error);
    // }
  };

  return (
    <div className="w-full h-[35px] bg-black rounded-full flex  flex-row items-center p-[10px] mt-[10px]">
      <FaPaperclip></FaPaperclip>
      <input
        className="flex w-full bg-black border-white ml-[20px] mr-[5px] pl-[5px]"
        placeholder="Digite aqui..."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></input>
      <div className="space-x-[10px] flex flex-row ">
        <FaMicrophone></FaMicrophone>
        <FaPaperPlane
          onClick={sendMessage}
          className="cursor-pointer"
        ></FaPaperPlane>
      </div>
    </div>
  );
};

export default MessageBar;
