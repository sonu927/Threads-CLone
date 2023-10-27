import { Button, Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atom/postsAtom";
import SuggestedUsers from "../components/SuggestedUsers";

const HomePage = () => {
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const getFeedPosts = async () => {
    setLoading(true);
    setPosts([]);
    try {
      const res = await fetch("/api/posts/feed");
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      //console.log(data);
      setPosts(data);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFeedPosts();
  }, []);
  return (
    <>
      <SuggestedUsers getFeedPosts={getFeedPosts} />
      {!loading && posts.length === 0 && <h1>Follow some users to see feed</h1>}

      {loading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default HomePage;
