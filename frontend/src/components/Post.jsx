import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import postsAtom from "../atom/postsAtom";

const Post = ({ post, postedBy }) => {
  const showToast = useShowToast();
  const [user, setUser] = useState(null);
  const currentUser = useRecoilValue(userAtom);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/users/profile/" + postedBy);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        //console.log(data);
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
        setUser(null);
      }
    };
    getUser();
  }, [postedBy]);

  const handleDeletePost = async (e) => {
    try {
      e.preventDefault();

      if (!window.confirm("Are you sure you want to delete this post ?"))
        return;

      const res = await fetch(`/api/posts/${post._id}`, {
        method: "Delete",
      });

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post Deleted", "success");
      setPosts(posts.filter((p) => p._id !== post._id));
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return (
    <Link to={`/${user?.username}/post/${post._id}`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex direction={"column"} alignItems={"center"}>
          <Avatar
            size={"md"}
            name={user?.name}
            src={user?.profilePic}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user?.username}`);
            }}
          />
          <Box w={1} h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && (
              <Text textAlign={"center"} fontSize={20}>
                🥱
              </Text>
            )}
            {post.replies[0] && (
              <Avatar
                size={"xs"}
                name={post.replies[0].username}
                src={post.replies[0].userProfilePic}
                position={"absolute"}
                top={"0px"}
                left={"15px"}
                padding={"2px"}
              />
            )}

            {post.replies[1] && (
              <Avatar
                size={"xs"}
                name={post.replies[1].username}
                src={post.replies[1].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                right={"-5px"}
                padding={"2px"}
              />
            )}

            {post.replies[2] && (
              <Avatar
                size={"xs"}
                name={post.replies[2].username}
                src={post.replies[2].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                left={"4px"}
                padding={"2px"}
              />
            )}
          </Box>
        </Flex>
        <Flex flex={1} direction={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex alignItems={"center"} w={"full"}>
              <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user?.username}`);
                }}
              >
                {user?.username}
              </Text>
              <Image w={4} h={4} ml={1} src="/verified.png" />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text
                fontSize={"xs"}
                width={36}
                textAlign={"right"}
                color={"gray.light"}
              >
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </Text>

              {currentUser?._id === user?._id && (
                <DeleteIcon
                  size={20}
                  cursor={"pointer"}
                  onClick={handleDeletePost}
                />
              )}
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={post.img} w={"full"} />
            </Box>
          )}

          <Flex gap={3} my={1}>
            <Actions post={post} />
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Post;
