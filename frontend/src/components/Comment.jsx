import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const Comment = ({ reply, lastReply }) => {
  return (
    <>
      <Flex gap={4} py={3} my={3} w={"full"}>
        <Avatar src={reply.userProfilePic} size={"sm"} name={reply.username} />
        <Flex gap={1} w={"full"} direction={"column"}>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {reply.username}
            </Text>
          </Flex>
          <Text>{reply.text}</Text>
        </Flex>
      </Flex>

      {!lastReply ? <Divider /> : null}
    </>
  );
};

export default Comment;
