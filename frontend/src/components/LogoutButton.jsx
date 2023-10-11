import { Button } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atom/userAtom";
import useShowToast from "../hooks/useShowToast";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
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

      localStorage.removeItem("user-thread");
      setUser(null);
    } catch (error) {
      showToast("Error", error, "error");
    }
  };
  return (
    <>
      <Button
        position={"fixed"}
        top={{ base: "60px", sm: "55px" }}
        right={{ base: "15px", sm: "20px" }}
        size={{ base: "xs", sm: "sm" }}
        onClick={handleLogout}
      >
        <FiLogOut size={20} />
      </Button>
    </>
  );
};

export default LogoutButton;
