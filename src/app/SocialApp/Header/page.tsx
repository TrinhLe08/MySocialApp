"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import { LogOut, User2, Twitch, Home, Search, Mail } from "lucide-react";
import { useRecoilState, useRecoilValue } from "recoil";
import Recoil from "@/app/recoilContextProvider";
import postData from "@/app/CRUDdata/postData";
import { DataUser } from "../VSocial/Profile/page";

const socket = io("https://nextsever.onrender.com:4000");

export default function Header() {
  const [myValue, setMyValue] = useRecoilState(Recoil.AtomUser);
  const [valuePost, setValuePost] = useRecoilState(Recoil.AtomPost);
  const [valueUser, setValueSuggestUser] = useRecoilState(
    Recoil.AtomSuggestUser
  );
  const [topPost, setTopPost] = useRecoilState(Recoil.AtomPostTop);
  const [valueNotification, setValueNotification] = useRecoilState(
    Recoil.AtomNotification
  );
  const NotificationValue: any = useRecoilValue(Recoil.AtomNotification);
  const Value: DataUser = useRecoilValue(Recoil.AtomUser);
  const router = useRouter();

  const ViewPost = async () => {
    const userId: string = Value._id;
    const POST: any = await postData(
      { userId },
      "https://nextsever.onrender.com/v/view-post"
    );
    setTopPost(POST.data.TopPost);
    setValuePost(POST.data.ViewPost);
  };

  const ViewSuggestFriend = async () => {
    const myId: string = Value._id;
    const UserSuggest: any = await postData(
      { myId },
      "https://nextsever.onrender.com/v/view-suggest-user"
    );
    setValueSuggestUser(UserSuggest.data.AllUsersSuggest);
  };

  // Check User Offline
  const handleBeforeUnload = () => {
    socket.emit("checkUserOffline", { myId: Value._id });

    socket.on("Data check User Offline", (response) => {
      console.log(response);
    });
  };
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Chưa Đăng Nhập -> Cút
  useEffect(() => {
    const webToken = localStorage.getItem("token");

    if (!webToken) {
      router.push("/SocialApp/VSocial?log=Login");
    }
  }, []);

  // check Notification
  const CheckNotification = async () => {
    const response: any = await postData(
      { myId: Value._id },
      "https://nextsever.onrender.com/v/view-one-user"
    );
    setMyValue(response.data.User);
    setValueNotification({});
  };

  // My Value
  const MyPage = async () => {
    const response: any = await postData(
      { myId: Value._id },
      "https://nextsever.onrender.com/v/view-one-user"
    );
    console.log(response.data.User);

    setMyValue(response.data.User);
    setValueNotification({});
  };

  return (
    <div className="flex w-full h-20 justify-around items-center mb-10 pb-4 font-semibold text-xl border-b-2 border-black-500 fixed bg-white z-20">
      <h1 className="text-4xl ">VSocial</h1>
      <div></div>
      <div className="flex gap-20 justify-between">
        <Link
          href="/SocialApp/VSocial/?h=Home"
          className="flex gap-1 items-center"
          onClick={() => ViewPost()}
        >
          Trang Chủ
          <Home />
        </Link>
        <Link
          href="/SocialApp/VSocial/?se=Search"
          className="flex gap-1 items-center"
          onClick={() => ViewSuggestFriend()}
        >
          Tìm Kiếm
          <Search />
        </Link>

        <Link
          href="/SocialApp/VSocial/?mes=Message"
          className="flex gap-1 items-center"
          onClick={() => MyPage()}
        >
          Nhắn Tin
          <Twitch />
        </Link>
        <Link
          href="/SocialApp/VSocial/?letters=Letters"
          className="flex gap-1 items-center"
          onClick={() => CheckNotification()}
        >
          Thư
          <Mail />
          {NotificationValue && Array.isArray(NotificationValue) ? (
            NotificationValue.indexOf(Value._id) != -1 ? (
              <div className="w-3 h-3 rounded-full bg-red-300 mt-[-10px]"></div>
            ) : null
          ) : null}
        </Link>
        <Link
          href="/SocialApp/VSocial/?profile=Profile"
          className="flex gap-1 items-center pt-2"
        >
          <img
            src={Value.linkAvatar}
            alt=""
            className="w-12 h-12 rounded-full text-center ml-8"
          />
          <h1 className=" text-2xl">{Value.name}</h1>
        </Link>
        <Link
          href="/SocialApp/VSocial/?log=Login"
          className="flex gap-1 justify-center items-center w-10 h-10 border-2 border-black-700 rounded-lg bg-black text-white border-none"
          onClick={() => handleBeforeUnload()}
        >
          <LogOut />
        </Link>
      </div>
    </div>
  );
}
