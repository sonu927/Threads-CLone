import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiConversation } from "react-icons/bi";
import Conversation from "../components/Conversation";
import MessageContainer from "../components/MessageContainer";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import { chatsAtom, selectedChatAtom } from "../atom/messageAtom";
import userAtom from "../atom/userAtom";
import { useSocket } from "../context/SocketContext";

const ChatPage = () => {
  const showToast = useShowToast();
  const [loadingChats, setLoadingChats] = useState(true);
  const [chats, setChats] = useRecoilState(chatsAtom);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatAtom);
  const currentUser = useRecoilValue(userAtom);
  const [searchText, setSearchText] = useState("");
  const [searchingUser, setSearchingUser] = useState(false);
  const { socket, onlineUsers } = useSocket();

  useEffect(() => {
    const getChats = async () => {
      try {
        const res = await fetch("/api/messages/chats");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.message, "error");
          return;
        }
        setChats(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoadingChats(false);
      }
    };
    getChats();
  }, [setChats]);

  const handleSearchChat = async (e) => {
    e.preventDefault();
    setSearchingUser(true);
    try {
      const res = await fetch(`/api/users/profile/${searchText}`);
      const searchedUser = await res.json();
      if (searchedUser.error) {
        showToast("Error", searchedUser.error, "error");
        return;
      }

      //if user is trying to message themselves
      const messagingYourSelf = searchedUser._id === currentUser._id;
      if (messagingYourSelf) {
        showToast("Error", "You cannot message yourself", "error");
        return;
      }

      //if user already have a conversation with them
      const chatAlreadyExist = chats.find(
        (chat) => chat.participants[0]._id === searchedUser._id
      );
      if (chatAlreadyExist) {
        setSelectedChat({
          _id: chatAlreadyExist._id,
          userId: searchedUser._id,
          username: searchedUser.username,
          userProfilePic: searchedUser.profilePic,
        });
        return;
      }

      const mockConversation = {
        mock: true,
        lastMessage: {
          text: "",
          sender: "",
        },
        _id: Date.now(),
        participants: [
          {
            _id: searchedUser._id,
            username: searchedUser.username,
            userProfilePic: searchedUser.profilePic,
          },
        ],
      };

      setChats((prevChats) => [...prevChats, mockConversation]);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setSearchingUser(false);
      setSearchText("");
    }
  };

  return (
    <Box
      position={"absolute"}
      left={"50%"}
      transform={"translateX(-50%)"}
      w={{
        base: "100%",
        md: "80%",
        lg: "750px",
      }}
      p={4}
    >
      <Flex
        gap={4}
        direction={{
          base: "column",
          md: "row",
        }}
        maxW={{
          sm: "400px",
          md: "full",
        }}
        mx={"auto"}
      >
        <Flex
          flex={30}
          direction={"column"}
          gap={2}
          maxW={{ sm: "250px", md: "full" }}
          mx={"auto"}
        >
          <Text
            fontWeight={700}
            color={useColorModeValue("gray.700", "gray.400")}
          >
            Chats
          </Text>
          <form onSubmit={handleSearchChat}>
            <Flex alignItems={"center"} gap={2}>
              <Input
                placeholder="Search user...."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                size={"sm"}
                onClick={handleSearchChat}
                isLoading={searchingUser}
              >
                <Search2Icon />
              </Button>
            </Flex>
          </form>

          {loadingChats &&
            [0, 1, 2, 3, 4].map((_, i) => (
              <Flex key={i} gap={2} alignItems={"center"}>
                <Box>
                  <SkeletonCircle size={10} />
                </Box>
                <Flex direction={"column"} w={"full"} gap={2}>
                  <Skeleton h={"10px"} w={"80%"} />
                  <Skeleton h={"8px"} w={"90%"} />
                </Flex>
              </Flex>
            ))}

          {!loadingChats &&
            chats.map((chat) => (
              <Conversation
                key={chat._id}
                chat={chat}
                isOnline={onlineUsers.includes(chat.participants[0]._id)}
              />
            ))}
        </Flex>
        {!selectedChat._id && (
          <Flex
            direction={"column"}
            flex={70}
            alignItems={"center"}
            justifyContent={"center"}
            h={"400px"}
            p={4}
            borderRadius={"md"}
          >
            <BiConversation size={100} />
            <Text fontSize={20}>Select a conversation to start messaging</Text>
          </Flex>
        )}

        {selectedChat._id && <MessageContainer />}
      </Flex>
    </Box>
  );
};

export default ChatPage;
