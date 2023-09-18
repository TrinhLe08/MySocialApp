"use client";
import React, { useRef, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useRecoilState, useRecoilValue } from "recoil";
import { DataUser } from "../Profile/page";
import Recoil from "@/app/recoilContextProvider";
import postData from "@/app/CRUDdata/postData";

export default function SearchUser() {
  const [spinConnect, setSpinConnect] = useState(false);
  const [spinLoad, setSpinLoad] = useState(false);
  const [valueOtherUser, setValueOtherUser] = useRecoilState(
    Recoil.AtomOtherUser
  );
  const [suggestValues, setSuggestValues] = useState([]);
  const ValueSuggestUser: DataUser[] = useRecoilValue(Recoil.AtomSuggestUser);
  const Value: DataUser = useRecoilValue(Recoil.AtomUser);
  const ValuesFind: DataUser[] = useRecoilValue(Recoil.AtomFindUsers);
  const router: any = useRouter();
  const ValuesToFindUser: any = useRef("");
  const antIconToLoad = (
    <LoadingOutlined
      style={{
        fontSize: 34,
        color: "black",
      }}
      spin
    />
  );

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 50,
        color: "black",
      }}
      spin
    />
  );
  // Spin Load Connect Friend
  setTimeout(() => {
    setSpinLoad(true);
  }, 500);

  const SuggestUsers = () => {
    const values = ValuesToFindUser.current.value;
    console.log(ValuesFind, 19);
    const VALUES: any = ValuesFind.filter((v: any) => {
      const name = v.name.toLowerCase(); // Chuyển thuộc tính `name` thành chữ thường để so sánh không phân biệt hoa thường
      return [...name].some((char) => values.includes(char)); // So sánh từng kí tự trong `name` xem có xuất hiện trong `values` không
    });
    setSuggestValues(VALUES);
  };

  const FindUsers = () => {
    const values = ValuesToFindUser.current.value;
    console.log(ValuesFind, 19);
    const VALUES: any = ValuesFind.filter(
      (v: any) => v.name.toLowerCase() === values.toLowerCase()
    );
    console.log(VALUES);

    setSuggestValues(VALUES);
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

      console.log(response.data.OtherUserProfile, 127);

      setValueOtherUser(response.data.OtherUserProfile);

      router.push(`/SocialApp/VSocial?orther-profile-user=${userId}`);
      window.scrollTo(0, 0);
    }, 500);
  };

  return (
    <div className="flex w-full pt-20">
      {spinConnect ? (
        <div className="w-full h-screen justify-center z-50 mt-20 items-center bg-white flex justify-center z-2 absolute  top-0">
          <Spin indicator={antIcon} className="relative" />
        </div>
      ) : null}
      <div className="grid h-fit justify-center gap-5 w-80 w-2/6 border-r-2 border-black-700 text-center pt-10 fixed z-20">
        <h1 className="text-2xl font-semibold">
          Những Người Bạn Có Thể Biết :
        </h1>
        <div className="grid h-fit items-center text-left justify-center gap-5 text-2xl font-medium mb-96">
          {!spinLoad ? (
            <div className="w-64 h-full justify-center z-50 mt-[100px] ml-8 items-center bg-white flex justify-center z-2 absolute  top-0">
              <Spin indicator={antIconToLoad} className="relative" />
            </div>
          ) : null}
          {ValueSuggestUser
            ? ValueSuggestUser.map((f: any) => (
                <div className="flex gap-5">
                  <img
                    src={f.linkAvatar}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <button
                    className="underline"
                    onClick={() => OtherProfile(f._id)}
                  >
                    {f.name}
                  </button>
                </div>
              ))
            : null}
        </div>
      </div>

      <div className="flex gap-4 w-full ml-96 mt-10 ">
        <div className="w-full">
          <div className="w-full flex gap-4">
            <input
              type="text"
              placeholder="Nhập Tên Cần Tìm"
              className="w-3/4 h-10 pl-4 border-2 border-black-700 rounded-lg"
              ref={ValuesToFindUser}
              onChange={() => SuggestUsers()}
            />
            <button
              className="flex justify-center items-center w-10 h-10 border-black-700 rounded-lg bg-black text-white text-lg"
              onClick={() => FindUsers()}
            >
              <Search />
            </button>
          </div>

          <div className="grid gap-5 mt-10 text-xl">
            {suggestValues.map((f: any) => (
              <div className="flex w-5/6 justify-between border-t-2 border-black-700 pt-5">
                <div className="flex gap-5">
                  <img
                    src={f.linkAvatar}
                    alt=""
                    className="w-24 h-24 rounded-full"
                  />
                  <div className="grid">
                    <h1 className="font-semibold text-2xl">{f.name}</h1>
                    <div className="flex gap-2">
                      <p>{f.numberOfPost} Bài Đăng, </p>
                      <p>{f.numberOfPost} Bạn Bè</p>
                    </div>
                  </div>
                </div>
                <button
                  className="grid w-28 h-12 gap-10"
                  onClick={() => OtherProfile(f._id)}
                >
                  <p className="underline">Xem Thêm</p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
