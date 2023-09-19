"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import { useRecoilState, useRecoilValue } from "recoil";
import { DataUser } from "../Profile/page";
import { Button, Modal } from "antd";
import Recoil from "@/app/recoilContextProvider";
import postData from "@/app/CRUDdata/postData";

const socket = io("https://nextsever.onrender.com:4000");

export default function OtherProfile() {
  const MyValue: DataUser = useRecoilValue(Recoil.AtomUser);
  const Value: DataUser = useRecoilValue(Recoil.AtomOtherUser);
  const [valueOtherUser, setValueOtherUser] = useRecoilState(
    Recoil.AtomOtherUser
  );
  const [valueNotification, setValueNotification] = useRecoilState(
    Recoil.AtomNotification
  );
  // ANT
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Vui Lòng Kết Bạn Để Nhắn Tin !");

  // ROUTER
  const router: any = useRouter();

  // func
  const CheckConnect = async () => {
    if (Value.checkConnect != true) {
      setOpen(true);
      return;
    }
    router.push("/SocialApp/VSocial?mes=Message");
  };

  const Connect = async () => {
    if (Value.checkConnect === undefined && Value.checkConnect == true) {
      return;
    }
    const userId = Value._id;
    const myId = MyValue._id;
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const Time =
      "Gửi Lúc " +
      currentDate.toLocaleTimeString() +
      ", " +
      day +
      "/" +
      month +
      "/" +
      year +
      " ";
    let dataUser = {
      userId: userId,
      myId: myId,
      content: "Lời Mời Kết Bạn",
      name: MyValue.name,
      time: Time,
      linkAvatar: MyValue.linkAvatar,
    };
    socket.emit("Notification", dataUser);
    socket.on("NotificationData", (response) => {
      console.log(response, 69);
      setValueNotification(response);
    });
    const response: any = await postData(
      { userId, dataUser, myId },
      "https://nextsever.onrender.com/v/connect-friend"
    );
    setValueOtherUser(response.data.OtherUserProfile);
  };

  const ToPost = (id: string) => {
    router.push("/SocialApp/VSocial?h=Home");
    const scrollToElement = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    setTimeout(() => {
      scrollToElement(id);
    }, 500);
  };

  // func ant
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="grid justify-center w-full h-screen pt-24 text-xl ">
      <button
        className="flex justify-center items-center w-36 h-10 z-10 top-16 left-16 translate-y-[5px] translate-x-[-200px] hover:bg-gray-100"
        onClick={() => {
          window.history.back();
        }}
      >
        ↚ Quay Lại
      </button>
      <div className="grid w-full h-auto text-center justify-center">
        <div className="w-full grid justify-center">
          <img
            src={Value.linkImg}
            alt=""
            className="w-[1000px] h-80 mb-[-70px]"
          />
          <div className="w-full flex justify-center">
            <img
              src={Value.linkAvatar}
              alt=""
              className="w-40 h-40 rounded-full"
            />
          </div>
        </div>
        <h1 className="text-3xl font-semibold mt-5">{Value.name}</h1>
        <h1 className="text-2xl mt-2">{Value.address}</h1>
        <div className="flex gap-5 font-semibold justify-center mt-10  ">
          <div className="flex gap-5 border-b-2 border-black-700 text-2xl">
            <p>{Value.numberOfPost} Bài Viết</p>
            <p>{Value.numberOfLike} Lượt Thích</p>
            <p>{Value.numberOfFollow} Bạn Bè</p>
          </div>
        </div>
        <div className="flex gap-10 justify-center mt-5">
          <button
            // className="w-32 border-2 border-black-700 rounded-lg bg-black text-white"
            className={
              Value.checkConnect == undefined
                ? "w-32 border-2 rounded-lg bg-black text-white"
                : "w-32 border-2 rounded-lg bg-white text-black"
            }
            onClick={() => Connect()}
          >
            {Value.checkConnect === true
              ? "Bạn bè"
              : Value.checkConnect === false
              ? "Đang Chờ "
              : Value.checkConnect === undefined
              ? "Kết Bạn"
              : null}
          </button>

          <Button
            type="primary"
            onClick={CheckConnect}
            className=" w-32 flex justify-center items-center font-semibold border-2 border-black-700 rounded-lg bg-black text-white text-xl"
            style={{ backgroundColor: "black", color: "white" }}
          >
            Nhắn tin
          </Button>
          <Modal
            title="Thông báo "
            open={open}
            onOk={CheckConnect}
            confirmLoading={confirmLoading}
            footer={null}
            onCancel={handleCancel}
          >
            <p>{modalText}</p>
          </Modal>
        </div>
        <div className="pl-20 text-left">
          <h1 className="pl-0 text-3xl font-semibold">Bài Viết : </h1>
          {Value.Post
            ? Value.Post.map((p: any) => (
                <div
                  className="w-[800px] grid gap-2 h-auto pb-3 mt-5 text-left border-b-2 border-black-700"
                  key={p._id}
                >
                  <div className="flex items-center gap-5 underline text-2xl">
                    <img
                      src={p.linkAvatar}
                      alt=""
                      className="w-20 h-20 rounded-full"
                    />
                    <div className="grid gap-2">
                      <p className="underline">{p.name}</p>
                      <span className="text-sm no-underline font-semibold text-slate-500">
                        {p.time}
                      </span>
                    </div>
                  </div>
                  <p className="w-full">{p.capOfPost}</p>
                  <div>
                    <img src={p.linkImg} alt="" className="w-full h-full" />
                  </div>
                  <button
                    className="flex gap-10 text-2xl text-center underline"
                    onClick={() => ToPost(p._id)}
                  >
                    Xem Thêm
                  </button>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
