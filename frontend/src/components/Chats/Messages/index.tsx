import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";

// import { Container } from './styles';
interface Props {
  messages: any;
}

const Messages: React.FC<Props> = ({ messages }) => {
  return (
    <div className="w-full h-[75%] bg-gray-600">
      {Array.isArray(messages) ? (
        messages
          .slice(0, 10)
          .map((message: any, index: any) =>
            message.fromMe == true ? (
              <div className="bg-red-500  w-[400px] flex absolute right-[30px] h-fit p-[5px]">
                {message.content}
              </div>
            ) : (
              <div>{message.content}</div>
            )
          )
      ) : (
        // Handle the case when messages is not an array
        <div>Messages is not an array</div>
      )}
    </div>
  );
};

export default Messages;
