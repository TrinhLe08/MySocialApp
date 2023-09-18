"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";
import Header from "../../Header/page";
import Recoil from "@/app/recoilContextProvider";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export interface DataUser {
  _id: string;
  // friend Id
  userId: string;
  address: string;
  Post: Array<{
    capOfPost: string;
    numberOfComment: number;
    numberOflike: number;
    photoOfPost: string;
    time: string;
  }>;
  friend: any[];
  linkAvatar: string;
  linkImg: string;
  name: string;
  numberOfComment: number;
  numberOfFollow: number;
  numberOflike: number;
  numberOfLike: number | null;
  numberOfPost: number;
  connect: any | null;
  checkConnect: boolean | null;
}

export interface Props {
  value: DataUser;
}

export interface ComponentProps {
  Component: React.ComponentType<Props>;
}
export default function ProfilePage(Component: ComponentProps) {
  const ComponentData: React.ComponentType<Props> = Component.Component;
  const Value: DataUser = useRecoilValue(Recoil.AtomUser);
  const [spin, setSpin] = useState(true);
  setTimeout(() => {
    setSpin(false);
  }, 200);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 50,
        color: "black",
      }}
      spin
    />
  );

  return (
    <div>
      <Header />
      {spin ? (
        <div className="w-full h-[800px] pl-[700px] bg-white pr-96 pt-60 flex justify-center z-999 absolute  top-0">
          <Spin indicator={antIcon} className="relative" />
        </div>
      ) : null}
      <div className=" w-full flex text-xl font-semibold">
        <div className="grid justify-center gap-5 w-80 h-auto w-2/6 border-r-2 border-black-700 text-center mt-24 fixed">
          <img
            src={Value.linkAvatar}
            alt=""
            className="w-40 h-40 rounded-full text-center ml-8"
          />
          <h1 className="text-2xl">{Value.name}</h1>
          <p>{Value.address}</p>

          <div className="grid gap-4 w-52 border-2 border-black-500 rounded-lg justify-center py-4">
            <div className="grid gap-2 w-40 border-b-2 border-black-500 pb-8">
              <Link href="/SocialApp/VSocial/?profile=Profile">Tôi</Link>
              <Link href="/SocialApp/VSocial/?pro-post=Post">Bài Viết</Link>
              <Link href="/SocialApp/VSocial/?pro-friend=MyFriend">Bạn Bè</Link>
            </div>
            <div className="grid gap-2">
              <Link href="/SocialApp/VSocial/?pro-infor=MyInfor">Cập Nhật</Link>
              <Link href="/SocialApp/VSocial/?pro-password=MyPassord">
                Mật Khẩu
              </Link>
            </div>
          </div>
        </div>

        <ComponentData value={Value} />
      </div>
    </div>
  );
}

// export default function ProfilePageWapper() {
//   return (
//     <Recoil.RecoilProvider>
//       <ProfilePage />
//     </Recoil.RecoilProvider>
//   );
// }
