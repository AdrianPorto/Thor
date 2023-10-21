import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";

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
                    ? "bg-[#3F3F3F] w-[400px] ml-auto p-[8px] rounded-[10px] text-white"
                    : "bg-white w-[400px] p-2 rounded-bl-[10px] rounded-tr-[10px] text-black"
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
