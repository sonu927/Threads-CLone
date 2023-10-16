import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Message = ({ ownMessage }) => {
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text maxW={"350px"} bg={"blue.500"} p={1} borderRadius={"md"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
          <Avatar src="" size={"sm"} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src="" size={"sm"} />
          <Text maxW={"350px"} bg={"gray.500"} p={1} borderRadius={"md"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
