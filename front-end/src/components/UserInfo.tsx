import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoAtom } from "../atoms/state";
import "./UserInfo.scss";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/user");
      const data = await res.json();
      setUserInfo(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="UserInfo">
      {error && "무언가 잘못되었습니다!"}
      {loading && "데이터를 읽고 있습니다."}
      {userInfo.username.length > 0 &&
        `"${userInfo.username}"님이 로그인 되어있습니다.`}
    </div>
  );
};

export default UserInfo;
