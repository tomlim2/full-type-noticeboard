import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userInfoAtom } from "../atoms/state";
import "./UserInfo.scss";

const UserInfo = () => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoAtom)

    useEffect(() => {
        fetch("http://localhost:5000/api/user")
          .then((res) => res.json())
          .then((data) => setUserInfo(data));
      }, []);

  return <div className="UserInfo">"{userInfo.username}"님이 로그인 되어있습니다.</div>;
};

export default UserInfo;
