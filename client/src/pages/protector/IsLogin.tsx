import type { RootState } from "@/store";
import { useCurrentUserQuery } from "@/store/slices/userApi";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function IsLogin({ children }: { children: React.ReactNode }) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();
  const { isError } = useCurrentUserQuery();

  useEffect(() => {
    if (!userInfo || isError) {
      navigate("/");
    }
  }, [userInfo]);
  return <>{children}</>;
}

export default IsLogin;
