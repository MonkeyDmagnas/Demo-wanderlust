import React, { useState, useEffect } from "react";
import axiosInstance from "../helpers/axiosInstance";
import userState from "../utils/UserState";
import { useLocation } from "react-router-dom";

const useAuthData = () => {
  const location = useLocation;
  const user = userState.getUser();

  const [data, setData] = useState({
    _id: user?._id || "",
    role: user?.role || "",
    token: "",
    loading: true,
  });

  useEffect(() => {
    setData({
      ...data,
      token: "",
    });
  }, [user?._id]);

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await axiosInstance.get(`/api/auth/check/${data._id}`);
        console.log("res::", res);
        setData({
          ...data,
          token: res.data?.accessToken,
          loading: false,
        });
      } catch (error) {
        setData({
          ...data,
          token: "",
          loading: false,
        });
      }
    }
    fetchToken();
  }, [location]);
  console.log("data from auth::", data);
  return data;
};

export default useAuthData;
