import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chatsAtom, selectedChatAtom } from "../atom/messageAtom";

const MessageInput = ({ setMessages }) => {
  const showToast = useShowToast();
  const [messageText, setMessageText] = useState("");
  const selectedChat = useRecoilValue(selectedChatAtom);
  const setChats = useSetRecoilState(chatsAtom);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText) return;

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedChat.userId,
        }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", error.message, "error");
        return;
      }
      setMessages((messages) => [...messages, data]);
      setChats((prevChats) => {
        const updatedChats = prevChats.map((chat) => {
          if (chat._id === selectedChat._id) {
            return {
              ...chat,
              lastMessage: {
                text: messageText,
                sender: data.sender,
              },
            };
          }
          return chat;
        });
        return updatedChats;
      });
      setMessageText("");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return (
    <form onSubmit={handleSendMessage}>
      <InputGroup>
        <Input
          w={"full"}
          placeholder="Type a message...."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
          <IoSendSharp />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
