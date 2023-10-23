import axios from "axios";
import React, { useState } from "react";

import { CiMenuKebab } from "react-icons/ci";
import MessageBar from "./MessageBar";
import Messages from "./Messages";
import ContactBar from "./ContactBar";

interface Props {
  Idchat: any;
  chats: any;
  messages: any;
}

// import { Container } from './styles';

const Chats: React.FC<Props> = ({ Idchat, chats, messages }) => {
  const [number, setNumber] = useState(5544988609457);

  return (
    <div className="rounded-[2vw] w-[970px] h-[510px] p-[10px] border-[#7E7E7E] border-[0.5px] relative bg-[#252525]">
      {Idchat != undefined ? (
        <div className="flex w-full h-full   flex-col  ">
          <ContactBar chats={chats} Idchat={Idchat}></ContactBar>
          <Messages messages={messages}></Messages>
          <MessageBar number={number}></MessageBar>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Chats;
