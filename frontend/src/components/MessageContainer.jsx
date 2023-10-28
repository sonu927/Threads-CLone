import {
  Avatar,
  Divider,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { chatsAtom, selectedChatAtom } from "../atom/messageAtom";
import userAtom from "../atom/userAtom";
import { useSocket } from "../context/SocketContext";

const MessageContainer = () => {
  const showToast = useShowToast();
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatAtom);
  const currentUser = useRecoilValue(userAtom);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  const { socket } = useSocket();
  const setChats = useSetRecoilState(chatsAtom);
  const messageEndRef = useRef(null);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      //console.log(message);
      if (selectedChat._id === message.conversationId) {
        setMessages((prevMsg) => [...prevMsg, message]);
      }

      setChats((prev) => {
        const updatedChats = prev.map((chat) => {
          if (chat._id === message.conversationId) {
            return {
              ...chat,
              lastMessage: {
                text: message.text,
                sender: message.sender,
              },
            };
          }
          return chat;
        });
        return updatedChats;
      });
    });

    return () => socket.off("newMessage");
  }, [socket]);

  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessages(true);
      setMessages([]);

      try {
        if (selectedChat.mock) return;
        const res = await fetch(`/api/messages/${selectedChat.userId}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setMessages(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoadingMessages(false);
      }
    };
    getMessages();
  }, [selectedChat.userId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <Flex
      flex={70}
      bg={useColorModeValue("gray.200", "gray.dark")}
      direction={"column"}
      borderRadius={"md"}
      p={2}
    >
      {/*Message Header*/}
      <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
        <Avatar
          src={selectedChat.userProfilePic}
          name={selectedChat.username}
          size={"sm"}
        />
        <Text display={"flex"} alignItems={"center"}>
          {selectedChat.username}{" "}
          <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
      </Flex>

      <Divider />

      {/* Messages */}
      <Flex
        direction={"column"}
        gap={4}
        my={4}
        p={2}
        height={"400px"}
        overflowY={"auto"}
      >
        {loadingMessages &&
          [...Array(5)].map((_, i) => (
            <Flex
              key={i}
              gap={2}
              alignItems={"center"}
              p={1}
              borderRadius={"md"}
              alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
            >
              {i % 2 === 0 && <SkeletonCircle size={7} />}
              <Flex alignItems={"center"} direction={"column"} gap={2}>
                <Skeleton h={4} w={"200px"} />
                <Skeleton h={4} w={"200px"} />
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle size={7} />}
            </Flex>
          ))}

        {!loadingMessages &&
          messages.map((message) => (
            <Flex
              key={message._id}
              direction={"column"}
              ref={
                messages.length - 1 === messages.indexOf(message)
                  ? messageEndRef
                  : null
              }
            >
              <Message
                message={message}
                ownMessage={currentUser._id === message.sender}
              />
            </Flex>
          ))}
      </Flex>

      <MessageInput setMessages={setMessages} />
    </Flex>
  );
};

export default MessageContainer;
