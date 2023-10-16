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
import React from "react";
import { BiConversation } from "react-icons/bi";
import Conversation from "../components/Conversation";
import MessageContainer from "../components/MessageContainer";

const ChatPage = () => {
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
          <form>
            <Flex alignItems={"center"} gap={2}>
              <Input placeholder="Search user...." />
              <Button size={"sm"}>
                <Search2Icon />
              </Button>
            </Flex>
          </form>

          {false &&
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

          <Conversation />
          <Conversation />
          <Conversation />
        </Flex>
        {/* <Flex
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
        </Flex> */}
        <MessageContainer />
      </Flex>
    </Box>
  );
};

export default ChatPage;
