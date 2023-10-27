import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Avatar,
  Text,
  Flex,
  useColorModeValue,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom";
const SuggestedUsers = ({ getFeedPosts }) => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [fetchingUsers, setFetchingUsers] = useState(true);
  const current_user = useRecoilValue(userAtom);
  const [updating, setUpdating] = useState(false);
  const showToast = useShowToast();

  const getSuggestedUser = async () => {
    try {
      const res = await fetch("/api/users/suggested");
      const data = await res.json();
      console.log("Suggested : ", data);
      setSuggestedUsers(data);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setFetchingUsers(false);
    }
  };

  const handleFollow = async (e, user) => {
    e.preventDefault();
    try {
      if (!current_user) {
        showToast("Error", "Please login to follow", "error");
        return;
      }
      if (updating) return;
      setUpdating(true);
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", `Followed ${user.name}`, "success");
      user.followers.push(current_user?._id);
      const newSuggested = suggestedUsers.filter((u) => u._id !== user._id);
      setSuggestedUsers(newSuggested);
      getFeedPosts();
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    getSuggestedUser();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
  };

  if (fetchingUsers) {
    return (
      <Flex justifyContent={"space-around"} alignContent={"center"} mb={4}>
        <Box bg={"gray.dark"} p={4} width={"100px"} borderRadius={"lg"}>
          <SkeletonCircle size="10" mb={2} ml={3} />
          <Skeleton height={"10px"} mb={2} />
          <Skeleton height={"20px"} />
        </Box>
        <Box bg={"gray.dark"} p={4} width={"100px"} borderRadius={"lg"}>
          <SkeletonCircle size="10" mb={2} ml={3} />
          <Skeleton height={"10px"} mb={2} />
          <Skeleton height={"20px"} />
        </Box>
        <Box bg={"gray.dark"} p={4} width={"100px"} borderRadius={"lg"}>
          <SkeletonCircle size="10" mb={2} ml={3} />
          <Skeleton height={"10px"} mb={2} />
          <Skeleton height={"20px"} />
        </Box>
      </Flex>
    );
  }

  return (
    <div style={{ padding: "3px" }}>
      <Slider {...settings}>
        {!fetchingUsers &&
          suggestedUsers.map((user) => {
            return (
              <Link to={`/${user.username}`} key={user._id}>
                <Box>
                  <Flex
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    p={2}
                    bg={useColorModeValue("gray.300", "gray.dark")}
                    mx={2}
                    borderRadius={"lg"}
                    w={"80%"}
                    gap={"5px"}
                  >
                    <Avatar
                      name={user.name}
                      src={user.profilePic}
                      size={{
                        base: "md",
                        sm: "lg",
                        md: "xl",
                      }}
                    />
                    <Text
                      fontSize={{
                        base: "xs",
                        sm: "sm",
                        md: "md",
                      }}
                    >
                      {user.username}
                    </Text>
                    <Button
                      size={{
                        base: "xs",
                        sm: "sm",
                        md: "md",
                      }}
                      onClick={(e) => handleFollow(e, user)}
                    >
                      Follow
                    </Button>
                  </Flex>
                </Box>
              </Link>
            );
          })}
      </Slider>
    </div>
  );
};

export default SuggestedUsers;
