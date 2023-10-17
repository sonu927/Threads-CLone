import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedChatAtom } from "../atom/messageAtom";
import userAtom from "../atom/userAtom";

const Message = ({ ownMessage, message }) => {
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatAtom);
  const user = useRecoilValue(userAtom);
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text maxW={"350px"} bg={"blue.500"} p={1} borderRadius={"md"}>
            {message.text}
          </Text>
          <Avatar src={user.profilePic} name={user.username} size={"sm"} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar
            src={selectedChat.userProfilePic}
            name={selectedChat.username}
            size={"sm"}
          />
          <Text maxW={"350px"} bg={"gray.500"} p={1} borderRadius={"md"}>
            {message.text}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
