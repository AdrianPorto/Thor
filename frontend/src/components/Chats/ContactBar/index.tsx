import React from "react";
import { CiMenuKebab } from "react-icons/ci";
// import { Container } from './styles';
interface Props {
  chats: any;
  Idchat: any;
}

const ContactBar: React.FC<Props> = ({ chats, Idchat }) => {
  return (
    <div className="flex flex-row h-[75px] border-b  border-[#7E7E7E]">
      <div className="flex flex-row space-x-[20px]   p-[10px]">
        <img
          src={chats[Idchat].fotoPerfil}
          className="flex rounded-full  w-[50px]  overflow-hidden select-none"
        />
        <div className="flex flex-col">
          <div>{chats[Idchat].nome}</div>
          <div className="text-[10px] mt-[3px] text-green-600">Online</div>
        </div>
      </div>
      <div className=" flex flex-1 w-full text-[30px]  justify-end items-center">
        <CiMenuKebab></CiMenuKebab>
      </div>
    </div>
  );
};

export default ContactBar;
