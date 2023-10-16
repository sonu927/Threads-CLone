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
import React from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
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
        <Avatar src="" size={"sm"} />
        <Text display={"flex"} alignItems={"center"}>
          johndoe <Image src="/verified.png" w={4} h={4} ml={1} />
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
        {false &&
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

        <Message ownMessage={true} />
        <Message ownMessage={false} />
        <Message ownMessage={false} />
        <Message ownMessage={true} />
        <Message ownMessage={false} />
        <Message ownMessage={true} />
        <Message ownMessage={false} />
        <Message ownMessage={true} />
        <Message ownMessage={false} />
        <Message ownMessage={true} />
      </Flex>

      <MessageInput />
    </Flex>
  );
};

export default MessageContainer;
