"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { DataUser } from "../Profile/page";
import Recoil from "@/app/recoilContextProvider";
import postData from "@/app/CRUDdata/postData";

function Letters() {
  const [spinConnect, setSpinConnect] = useState(false);
  const [spin, setSpin] = useState(false);
  const [valueOtherUser, setValueOtherUser] = useRecoilState(
    Recoil.AtomOtherUser
  );
  const [value, setValue] = useRecoilState(Recoil.AtomUser);
  const Value: DataUser = useRecoilValue(Recoil.AtomUser);
  const Notification: any = useRecoilValue(Recoil.AtomNotification);
  const router = useRouter();
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 40,
        color: "black",
      }}
      spin
    />
  );

  useEffect(() => {
    setTimeout(() => {
      setSpin(true);
    }, 500);
  }, []);

  const DeleteConnect = async (id: string, OR: boolean) => {
    console.log(id);

    const userId = id;
    const myId = Value._id;
    const or = OR;

    const response: any = await postData(
      { userId, myId, or },
      " http://localhost:8080/v/delete-connect"
    );

    setValue(response.data.MyUpdate);
  };

  const OtherProfile = async (id: string) => {
    setSpinConnect(true);
    setTimeout(async () => {
      const url = window.location.href;
      const urlParams = new URLSearchParams(new URL(url).search);
      const userIdParams = urlParams.get("orther-profile-user");
      const userId = id;
      const myId = Value._id;

      if (userId == Value._id || id == Value._id) {
        router.push(`/SocialApp/VSocial?profile=Profile`);
        return;
      }

      const response: any = await postData(
        { userId, myId },
        "http://localhost:8080/v/other-user-profile"
      );

      setValueOtherUser(response.data.OtherUserProfile);

      router.push(`/SocialApp/VSocial?orther-profile-user=${userId}`);
      window.scrollTo(0, 0);
    }, 500);
  };

  return (
    <div className="grid justify-center w-full h-auto pt-24 text-xl ">
      {spinConnect ? (
        <div className="w-full h-screen justify-center z-50 mt-20 items-center bg-white flex justify-center z-2 absolute  top-0">
          <Spin indicator={antIcon} className="relative" />
        </div>
      ) : null}
      <h1 className="mb-5 z-999 font-semibold">Thư Của Tôi : </h1>
      {!spin ? (
        <div className="w-full h-screen flex justify-center items-center z-98 absolute  top-0">
          <Spin indicator={antIcon} className="relative" />
        </div>
      ) : null}
      <div className="grid gap-3">
        {Value.connect
          ? Value.connect.map((p: any) => (
              <div
                className="w-[700px] h-24 justify-between items-center flex gap-5 p-5 border-2 border-black-700 rounded-lg"
                key={p._id}
              >
                <h1 className="mb-5 z-999">{p.content} : </h1>
                <div className="flex gap-2 items-center">
                  <img
                    src={p.linkAvatar}
                    alt=""
                    className="w-20 h-20 rounded-full text-center ml-8"
                  />
                  <div className="grid gap-1">
                    <button
                      className="underline text-left"
                      onClick={() => OtherProfile(p.myId)}
                    >
                      {p.name}
                    </button>
                    <p className="text-sm no-underline font-semibold text-slate-500">
                      {p.time}
                    </p>
                  </div>
                </div>
                <div className="grid h-20">
                  <button
                    className="w-20 h-8 border-black-700 rounded-lg bg-black text-white text-lg"
                    onClick={() => DeleteConnect(p.userId, false)}
                  >
                    Xóa
                  </button>
                  {p.content != "Có Người Nhắn Tin " ? (
                    <button
                      className="w-20 h-8 border-black-700 rounded-lg bg-black text-white text-lg"
                      onClick={() => DeleteConnect(p.myId, true)}
                    >
                      Đồng Ý
                    </button>
                  ) : null}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default function LettersV() {
  return (
    <>
      <Letters />
    </>
  );
}
