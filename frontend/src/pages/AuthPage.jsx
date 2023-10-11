import React from "react";
import SignupCard from "../components/SignupCard";
import LoginCard from "../components/LoginCard";
import { useRecoilValue } from "recoil";
import authScreenAtom from "../atom/authAtom";

const AuthPage = () => {
  const authScreenValue = useRecoilValue(authScreenAtom);
  return <>{authScreenValue === "login" ? <LoginCard /> : <SignupCard />}</>;
};

export default AuthPage;
