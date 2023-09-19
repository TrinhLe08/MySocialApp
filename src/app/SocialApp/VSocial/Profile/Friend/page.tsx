"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import Recoil from "@/app/recoilContextProvider";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { DataUser } from "../page";
import { Props } from "../page";
import { useRouter } from "next/navigation";
import postData from "@/app/CRUDdata/postData";

export default function MyFriend(value: Props) {
  const router = useRouter();
  const Value: DataUser = value.value;
  const [spinConnect, setSpinConnect] = useState(false);
  const [user, setUser] = useRecoilState(Recoil.AtomUser);
  const MyValue: DataUser = useRecoilValue(Recoil.AtomUser);
  const [valueOtherUser, setValueOtherUser] = useRecoilState(
    Recoil.AtomOtherUser
  );

  // ANT
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 50,
        color: "black",
      }}
      spin
    />
  );
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Vui Lòng Kết Bạn Để Nhắn Tin !");

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const OtherProfile = async (id: string) => {
    setSpinConnect(true);
    setTimeout(async () => {
      const url = window.location.href;
      const urlParams = new URLSearchParams(new URL(url).search);
      const userIdParams = urlParams.get("orther-profile-user");
      const userId = id;
      const myId = Value._id;

      if (userId == myId || id == myId) {
        router.push(`/SocialApp/VSocial?profile=Profile`);
        return;
      }

      const response: any = await postData(
        { userId, myId },
        "https://nextsever.onrender.com/v/other-user-profile"
      );

      console.log(response.data.OtherUserProfile, 127);

      setValueOtherUser(response.data.OtherUserProfile);

      router.push(`/SocialApp/VSocial?orther-profile-user=${userId}`);
      window.scrollTo(0, 0);
    }, 500);
  };

  const DeleteFriend = async (id: string) => {
    const userId = id;
    const myId = Value._id;

    const response: any = await postData(
      { userId, myId },
      "https://nextsever.onrender.com/v/delete-friend"
    );

    console.log(response?.data.MyUpdate);

    setUser(response.data.MyUpdate);
  };

  return (
    <div>
      {spinConnect ? (
        <div className="w-full h-screen justify-center z-50 mt-20 items-center bg-white flex justify-center z-2 absolute  top-0">
          <Spin indicator={antIcon} className="relative" />
        </div>
      ) : null}
      <div className="w-full pl-80 mt-24 pr-9">
        <h1 className="ml-4">Bạn Bè Của Tôi : </h1>
        <div className="grid grid-cols-2 gap-10 p-8">
          {Value.friend
            ? Value.friend.map((f: any) => (
                <div className="flex gap-4 border-2 border-black-700 rounded-lg p-2 items-center">
                  <img
                    src={f.linkAvatar}
                    alt=""
                    className="w-32 h-32 rounded-full text-center ml-8"
                  />
                  <div className="grid gap-2">
                    <button
                      className="underline text-left"
                      onClick={() => {
                        OtherProfile(f.userId);
                      }}
                    >
                      {f.name}
                    </button>
                    <p>
                      {f.numberOfPost} Bài Đăng, {f.numberOfFollow} Bạn Bè .
                    </p>
                  </div>

                  <Button
                    type="primary"
                    onClick={showModal}
                    className="w-32 flex justify-center items-center font-semibold border-2 border-black-700 rounded-lg bg-black text-white text-xl"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      borderColor: "black",
                    }}
                  >
                    Hủy Kết Bạn
                  </Button>
                  <Modal
                    title="Xác Nhận !"
                    open={open}
                    onOk={() => DeleteFriend(f.userId)}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    okText="Xác Nhận "
                    cancelText="Hủy"
                    cancelButtonProps={{
                      style: {
                        backgroundColor: "white",
                        color: "black",
                        borderColor: "black",
                        boxShadow: "none",
                      },
                    }}
                    okButtonProps={{
                      style: {
                        backgroundColor: "black",
                        color: "white",
                        borderColor: "black",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Bạn Có Chắc Muốn Xóa Kết Bạn ?
                  </Modal>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
