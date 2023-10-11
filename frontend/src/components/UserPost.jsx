import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Actions from "./Actions";

const UserPost = ({ likes, replies, postImg, postTitle }) => {
  const [liked, setLiked] = useState(false);
  return (
    <Link to="/zuckymark/post/1">
      <Flex gap={3} mb={4} py={5}>
        <Flex direction={"column"} alignItems={"center"}>
          <Avatar size={"md"} name="mark zuckerberg" src="/zuck-avatar.png" />
          <Box w={1} h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"xs"}
              name="joe mama"
              src="https://bit.ly/dan-abramov"
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="joe mama"
              src="https://bit.ly/kent-c-dodds"
              position={"absolute"}
              bottom={"0px"}
              right={"-5px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="joe mama"
              src="https://bit.ly/prosper-baba"
              position={"absolute"}
              bottom={"0px"}
              left={"4px"}
              padding={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} direction={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex alignItems={"center"} w={"full"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                mzuckerberg
              </Text>
              <Image w={4} h={4} ml={1} src="/verified.png" />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.light"}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{postTitle}</Text>
          {postImg && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={postImg} w={"full"} />
            </Box>
          )}

          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex gap={3} alignItems={"center"}>
            <Text fontSize={"sm"} color={"gray.light"}>
              {replies} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text fontSize={"sm"} color={"gray.light"}>
              {likes} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
