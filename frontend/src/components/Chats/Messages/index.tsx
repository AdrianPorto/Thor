import axios from "axios";
import React, { useEffect, useState } from "react";

// import { Container } from './styles';
interface Props {
  messages: any;
}

const Messages: React.FC<Props> = ({ messages }) => {
  return (
    <div className="w-full space-y-[10px] p-[20px] overflow-y-auto overflow-x-hidden flex flex-col h-full scroll-container scroll-content">
      {messages[0] != "" ? (
        <>
          {Array.isArray(messages) ? (
            messages.map((message, index) => (
              <div
                className={
                  message.fromMe
                    ? "bg-[#3F3F3F] w-[400px] ml-auto p-[8px] rounded-[10px] text-white  after:bg-[#252525] after:rounded-bl-[20px] after:w-[20px] after:h-[20px] after:right-0 after:mt-[12px]  after:absolute     before:bg-[#3F3F3F] before:w-[40px] before:h-[20px] before:right-[0px] before:mt-[12px]  before:absolute "
                    : "bg-white w-[400px] p-2 rounded-[10px] text-black   after:bg-[#252525] after:rounded-br-[20px] after:w-[20px] after:h-[20px] after:left-[0px] after:mt-[12px]  after:absolute     before:bg-white before:w-[27.99px] before:h-[20px] before:left-[0px] before:mt-[12px]  before:absolute"
                }
              >
                {message.content}
              </div>
            ))
          ) : (
            // Handle the case when messages is not an array
            <div>Carregando mensagens...</div>
          )}
        </>
      ) : (
        <div>Carregando mensagens...</div>
      )}
    </div>
  );
};

export default Messages;
