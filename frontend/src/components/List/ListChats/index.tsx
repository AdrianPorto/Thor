import React from "react";
import { FaSearch } from "react-icons/fa";
// import { Container } from './styles';
interface Props {
  chats: any;
  setIdChat: (value: any) => any;
}

const ListChats: React.FC<Props> = ({ chats, setIdChat }) => {
  return (
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
      <div className="scroll-container scroll-content   h-[78%] mt-[10px] flex flex-1 ">
        <div className="flex flex-col    flex-1   ">
          {chats.map((chat: any, index: any) => (
            <div
              className="flex flex-row space-x-[20px]  cursor-pointer rounded-[15px] mr-[5px] hover:bg-[#363535] p-[15px] m-0"
              onClick={() => {
                setIdChat(index);
               }}
            >
              <img
                src={chat.fotoPerfil}
                className="flex rounded-full  w-[60px]  overflow-hidden select-none"
                alt={`Foto de ${chat.nome}`}
              />

              <div>
                <div className="w-[120px]  text-[15px]">
                  {chat.nome && typeof chat.nome === "string"
                    ? chat.nome.length > 25
                      ? chat.nome.slice(0, 25) + "..."
                      : chat.nome.slice(0, 25)
                    : ""}
                </div>
                {chat.mensagem}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ListChats;
