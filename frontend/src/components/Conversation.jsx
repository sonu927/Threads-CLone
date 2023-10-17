import {
  Avatar,
  AvatarBadge,
  Flex,
  Image,
  Stack,
  Text,
  WrapItem,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { selectedChatAtom } from "../atom/messageAtom";

const Conversation = ({ chat }) => {
  const user = chat.participants[0];
  const lastMessage = chat.lastMessage;
  const currentUser = useRecoilValue(userAtom);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatAtom);
  const colorMode = useColorMode();
  return (
    <Flex
      alignItems={"center"}
      gap={4}
      p={1}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.dark"),
        color: "white",
      }}
      borderRadius={"md"}
      onClick={() => {
        setSelectedChat({
          _id: chat._id,
          userId: user._id,
          username: user.username,
          userProfilePic: user.profilePic,
        });
      }}
      bg={
        selectedChat._id === chat._id
          ? colorMode === "light"
            ? "gray.600"
            : "gray.dark"
          : ""
      }
    >
      <WrapItem>
        <Avatar
          size={{
            base: "xs",
            sm: "sm",
            md: "md",
          }}
          src={user.profilePic}
          name={user.username}
        >
          <AvatarBadge boxSize={"1em"} bg={"green.600"} />
        </Avatar>
      </WrapItem>
      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
          {user.username} <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {currentUser._id === lastMessage.sender ? (
            <BsCheck2All size={16} />
          ) : (
            ""
          )}
          {lastMessage.text.length > 20
            ? lastMessage.text.substring(0, 18) + "..."
            : lastMessage.text}
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
