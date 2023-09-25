"use client";
import React, { useState, useRef, useEffect } from "react";
import dotenv from "dotenv";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { io } from "socket.io-client";
import { DataUser } from "../Profile/page";
import Recoil from "@/app/recoilContextProvider";
import postData from "@/app/CRUDdata/postData";
dotenv.config();

const socket: any = io(`${process.env.NEXT_PUBLIC_URL_SERVER_SOCKET}`);
interface MessageType {
  IdRoom: string;
  OldMessage: any[];
}
interface CheckUserOnline {
  myId: string;
}

function Message() {
  const [spin, setSpin] = useState(false);
  const [spinConnect, setSpinConnect] = useState(false);
  const [checkMyMessage, setCheckMyMessage] = useState(false);
  const [idMyFriend, setIdFriend] = useRecoilState(Recoil.AtomIdFriend);
  const [idRoom, setIdRoom] = useRecoilState(Recoil.AtomMessageIdRoom);
  const [valueOtherUser, setValueOtherUser] = useRecoilState(
    Recoil.AtomOtherUser
  );
  const [valueNotification, setValueNotification] = useRecoilState(
    Recoil.AtomNotification
  );
  const [message, setMessage] = useRecoilState(Recoil.AtomViewMessage);
  const ViewMessage: any = useRecoilValue(Recoil.AtomViewMessage);
  const friendValue: DataUser = useRecoilValue(Recoil.AtomOtherUser);
  const RoomId: string = useRecoilValue(Recoil.AtomMessageIdRoom);
  const idFriend: string = useRecoilValue(Recoil.AtomIdFriend);
  const Value: DataUser = useRecoilValue(Recoil.AtomUser);

  const ValueCheckOnline: CheckUserOnline[] = useRecoilValue(
    Recoil.AtomCheckOnline
  );
  const formValue: any = useRef("");

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "black",
      }}
      spin
    />
  );

  const antIconConnect = (
    <LoadingOutlined
      style={{
        fontSize: 50,
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

  const ConnectFirendToChat = async (
    id: string,
    name: string,
    avatar: string
  ) => {
    setSpinConnect(true);
    const userId = id;
    const myId = Value._id;
    setIdFriend(id);
    setValueOtherUser({
      userId: id,
      name: name,
      linkAvatar: avatar,
    });

    const responseId: any = await postData(
      { userX: userId, userY: myId },
      `${process.env.NEXT_PUBLIC_URL_SERVER}/v/connect-id-room`
    );

    setIdRoom(responseId.data.IdRoom);
    setMessage(responseId.data);
    console.log(responseId.data.OldMessage);

    socket.emit("joinRoom", RoomId);
    setCheckMyMessage(true);
  };

  const SubmitFormValue = async () => {
    const values: string = formValue.current.value;
    socket.emit("joinRoom", RoomId);
    if (values == "") {
      return;
    }
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    // Thời gian
    const time =
      "Lúc " +
      currentDate.toLocaleTimeString() +
      ", Ngày " +
      day +
      "/" +
      month +
      "/" +
      year;
    // Message
    socket.emit("DataMessage", {
      myId: Value._id,
      friend: idFriend,
      name: Value.name,
      message: values,
      time: time,
      roomId: RoomId,
    });
    socket.on("ServerResponse", (response: any) => {
      setMessage(response);
    });

    let dataUser = {
      userId: friendValue.userId,
      myId: Value._id,
      content: "Có Người Nhắn Tin ",
      name: Value.name,
      time: time,
      linkAvatar: Value.linkAvatar,
    };
    // Notification
    socket.emit("Notification", dataUser);
    socket.on("NotificationData", (response: any) => {
      setValueNotification(response);
    });
  };

  // JSX COMPONET
  const MessageWidthFriend = () => {
    return (
      <div className="flex w-full h-screen pt-20 ">
        <div className="grid justify-center gap-5 w-80 h-full w-2/6 border-r-2 border-black-700 pt-10 fixed z-20">
          <h1 className="text-2xl font-semibold ">Bạn Bè : </h1>
          <div className="grid items-center justify-center gap-5 text-2xl font-medium mb-96">
            {Value.friend.map((f: any) => (
              <div className="flex gap-5" key={f._id}>
                <img
                  src={f.linkAvatar}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <button
                    className="underline text-left"
                    onClick={() => {
                      ConnectFirendToChat(f.userId, f.name, f.linkAvatar);
                    }}
                  >
                    {f.name}
                  </button>
                  <p className="text-base text-slate-500">
                    {ValueCheckOnline.includes(f.userId)
                      ? "Đang Trực Tuyến "
                      : "Không Trực Tuyến"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid h-fix ml-80  ">
          <div className=" flex items-center w-screen bg-white gap-3 h-20 text-2xl border-b-2 border-black-700 pl-10 font-semibold fixed ">
            <img
              src={friendValue.linkAvatar}
              alt=""
              className="w-12 h-12 rounded-full"
            />
            {friendValue.name}
          </div>
          <div className="grid gap-5 w-[950px] h-fit pt-20 pb-40 ml-16">
            {ViewMessage.OldMessage
              ? ViewMessage.OldMessage.map((v: any, index: number) => (
                  <div
                    className={
                      v.myId === Value.userId
                        ? "grid w-full grid justify-end gap-1 h-16"
                        : "grid w-full grid  gap-1 h-16 w-full"
                    }
                    key={v._id}
                  >
                    <div
                      className={
                        v.myId === Value._id
                          ? "w-auto grid justify-end"
                          : "w-auto grid "
                      }
                    >
                      <div
                        className={
                          v.myId === Value._id
                            ? " flex justify-end max-w-sm items-center gap-1"
                            : " flex gap-1 max-w-sm items-center "
                        }
                      >
                        <img
                          src={
                            v.myId === Value._id
                              ? Value.linkAvatar
                              : friendValue.linkAvatar
                          }
                          alt=""
                          className={
                            v.myId === Value._id
                              ? "order-2 w-8 h-8 rounded-full "
                              : "w-8 h-8 rounded-full "
                          }
                        />
                        <p className="text-xs no-underline font-semibold text-slate-500">
                          {v.time}
                        </p>
                      </div>
                      <div
                        className={
                          v.myId === Value._id
                            ? "flex justify-end "
                            : " flex gap-1 max-w-sm items-center "
                        }
                      >
                        <p
                          className={
                            v.myId === Value._id
                              ? "flex p-3 h-fit mr-8 w-fit justify-center items-center bg-black text-white rounded-tl-3xl rounded-tr-none rounded-br-3xl rounded-bl-3xl"
                              : "flex p-3 h-fit w-fit ml-8 justify-center items-center bg-slate-200 text-black rounded-tl-none rounded-tr-3xl rounded-br-3xl rounded-bl-3xl"
                          }
                        >
                          {v.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : null}
            {ViewMessage.data ? (
              <div
                className={
                  ViewMessage.data.myId === Value._id
                    ? "w-auto grid justify-end"
                    : "w-auto grid "
                }
              >
                <div
                  className={
                    ViewMessage.data.myId === Value._id
                      ? " flex justify-end max-w-sm items-center gap-1"
                      : " flex gap-1 max-w-sm items-center "
                  }
                >
                  <img
                    src={
                      ViewMessage.data.myId === Value._id
                        ? Value.linkAvatar
                        : friendValue.linkAvatar
                    }
                    alt=""
                    className={
                      ViewMessage.data.myId === Value._id
                        ? "order-2 w-8 h-8 rounded-full "
                        : "w-8 h-8 rounded-full "
                    }
                  />
                  <p className="text-xs no-underline font-semibold text-slate-500">
                    {ViewMessage.data.time}
                  </p>
                </div>
                <div
                  className={
                    ViewMessage.data.myId === Value._id
                      ? "flex w-full justify-end "
                      : "flex gap-1 max-w-sm items-center "
                  }
                >
                  <p
                    className={
                      ViewMessage.data.myId === Value._id
                        ? "flex p-3 h-fit mr-8 w-fit justify-center items-center bg-black text-white rounded-tl-3xl rounded-tr-none rounded-br-3xl rounded-bl-3xl"
                        : "flex p-3 h-fit w-fit ml-8 justify-center items-center bg-slate-200 text-black rounded-tl-none rounded-tr-3xl rounded-br-3xl rounded-bl-3xl"
                    }
                  >
                    {ViewMessage.data.message}
                  </p>
                </div>
              </div>
            ) : null}

            <div className="flex w-[1150px] fixed bottom-2.5 left-[22%] justify-around items-center">
              <div className="flex gap-10 mt-3 text-xl"></div>
              <div className="w-[900px] flex justify-center mt-3">
                <textarea
                  id="content"
                  name="content"
                  rows={2}
                  cols={250}
                  placeholder="..."
                  className="w-full pl-2 pt-2 border-2 border-black-700"
                  ref={formValue}
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => SubmitFormValue()}
                  className=" w-32 h-10 mt-5 border-black-700 rounded-lg bg-black text-white text-lg"
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {!checkMyMessage ? (
        <div className="w-screen h-screen grid justify-center items-center ">
          {spinConnect ? (
            <div className="w-full h-screen flex justify-center items-center z-999 absolute bg-gray-300 bg-opacity-50 top-0">
              <Spin indicator={antIconConnect} className="relative" />
            </div>
          ) : null}
          <div className="h-fit text-left mt-20">
            <h1 className="text-xl font-semibold">Chọn Bạn Bè Để Nhắn Tin :</h1>

            <div className="grid mt-5  items-center justify-center gap-5 text-2xl font-medium mb-96 text-left">
              {!spin ? (
                <div className="w-full h-screen flex justify-center items-center z-999 absolute top-0 left-0  top-0">
                  <Spin indicator={antIcon} className="relative" />
                </div>
              ) : Value.friend ? (
                Value.friend.map((f: any) => (
                  <div className="flex gap-5" key={f.userId}>
                    <img
                      src={f.linkAvatar}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <button
                        className="underline text-left"
                        onClick={() => {
                          ConnectFirendToChat(f.userId, f.name, f.linkAvatar);
                        }}
                      >
                        {f.name}
                      </button>
                      <p className="text-base text-slate-500">
                        {ValueCheckOnline.includes(f.userId)
                          ? "Đang Trực Tuyến"
                          : "Không Trực Tuyến"}
                      </p>
                    </div>
                  </div>
                ))
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <MessageWidthFriend />
      )}
    </>
  );
}

export default function MessageV() {
  return (
    <>
      <Message />
    </>
  );
}
