"use client";
import dotenv from "dotenv";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import { LogOut, User2, Twitch, Home, Search, Mail } from "lucide-react";
import { useRecoilState, useRecoilValue } from "recoil";
import Recoil from "@/app/recoilContextProvider";
import postData from "@/app/CRUDdata/postData";
import { DataUser } from "../VSocial/Profile/page";
dotenv.config();

const socket: any = io(`${process.env.NEXT_PUBLIC_URL_SERVER_SOCKET}`);

function Header() {
  const [myValue, setMyValue] = useRecoilState(Recoil.AtomUser);
  const [valuePost, setValuePost] = useRecoilState(Recoil.AtomPost);
  const [value, setValue] = useRecoilState(Recoil.AtomUser);
  const [valueUser, setValueSuggestUser] = useRecoilState(
    Recoil.AtomSuggestUser
  );
  const [postValue, setPostValue] = useRecoilState(Recoil.AtomPost);
  const [mypostValue, setMyPostValue] = useRecoilState(Recoil.AtomMyPost);
  const [isRequestPending, setRequestPending] = useRecoilState(
    Recoil.AtomFirstViewPost
  );
  const [checkIdToUpdateLike, setCheckIdToUpdateLike] = useRecoilState(
    Recoil.AtomCheckIdToUpdateLike
  );
  const [topPost, setTopPost] = useRecoilState(Recoil.AtomPostTop);
  const [valueNotification, setValueNotification] = useRecoilState(
    Recoil.AtomNotification
  );
  const [checkLikeUpdateDone, setCheckLikeUpdateDone] = useRecoilState(
    Recoil.AtomToCheckUpdateLikeDone
  );
  const NotificationValue: any = useRecoilValue(Recoil.AtomNotification);
  const Value: DataUser = useRecoilValue(Recoil.AtomUser);
  const ValuesFirstViewPost: any[] = useRecoilValue(Recoil.AtomFirstViewPost);
  const ValuesCheckIdToUpdateLike: any = useRecoilValue(
    Recoil.AtomCheckIdToUpdateLike
  );
  let ValuePost: any = useRecoilValue(Recoil.AtomPost);
  let CheckLike: any = useRecoilValue(Recoil.AtomToCheckUpdateLikeDone);

  const router = useRouter();

  const ViewPostToUpdate = async () => {
    if (!CheckLike) {
      setCheckLikeUpdateDone(true);
      let userId: string = Value._id;
      let uniqueArray = Array.from(new Set(ValuesCheckIdToUpdateLike));
      let POST: any = await postData(
        { userId },
        `${process.env.NEXT_PUBLIC_URL_SERVER}/v/view-post`
      );
      setRequestPending(POST.data.ViewPost);
      let POSTData: any = POST.data.ViewPost;
      if (POSTData != undefined) {
        console.log(POSTData);

        for (let index = 0; index < POSTData.length; index++) {
          for (let yndex = 0; yndex < ValuePost.length; yndex++) {
            if (
              POSTData[index]._id == ValuePost[yndex]._id &&
              POSTData[index].like != ValuePost[yndex].like &&
              uniqueArray.indexOf(ValuePost[yndex]._id) != -1
            ) {
              console.log(12);
              let userId = Value._id;
              let postId = ValuePost[yndex]._id;
              let setLike = ValuePost[yndex].like;
              let responseData: any = await postData(
                { setLike, postId, userId },
                `${process.env.NEXT_PUBLIC_URL_SERVER}/v/like-Post`
              );
              setPostValue(responseData.data.updatedViewPost);
              setMyPostValue(responseData.data.myPost);
              setValue(responseData.data.UserUpdate);
              let indexToDelete: number = uniqueArray.indexOf(
                ValuePost[yndex]._id
              );
              uniqueArray.slice(indexToDelete, 1);
              setCheckIdToUpdateLike(uniqueArray);
            }
          }
        }
      }
      setCheckLikeUpdateDone(false);
    }
    // setCheckIdToUpdateLike([]);
  };

  const ViewSuggestFriend = async () => {
    const myId: string = Value._id;
    const UserSuggest: any = await postData(
      { myId },
      `${process.env.NEXT_PUBLIC_URL_SERVER}/v/view-suggest-user`
    );
    setValueSuggestUser(UserSuggest.data.AllUsersSuggest);
    ViewPostToUpdate();
  };

  // Check User Offline
  const handleBeforeUnload = () => {
    socket.emit("checkUserOffline", { myId: Value._id });

    socket.on("Data check User Offline", (response: any) => {
      console.log(response);
    });
    ViewPostToUpdate();
  };
  // Log Out
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
      `${process.env.NEXT_PUBLIC_URL_SERVER}/v/view-one-user`
    );
    setMyValue(response.data.User);
    setValueNotification({});
    ViewPostToUpdate();
  };

  // My Value
  const MyPage = async () => {
    const response: any = await postData(
      { myId: Value._id },
      `${process.env.NEXT_PUBLIC_URL_SERVER}/v/view-one-user`
    );
    setMyValue(response.data.User);
    setValueNotification({});
    ViewPostToUpdate();
  };

  return (
    <div className="flex w-full h-20 justify-around items-center mb-10 pb-4 font-semibold text-xl border-b-2 border-black-500 fixed bg-white z-20">
      <Link
        href="/SocialApp/VSocial/?h=Home"
        className="flex gap-1 items-center text-4xl"
        // onClick={() => ViewPost()}
      >
        VSocial
      </Link>

      <div className="flex gap-20 justify-between">
        <Link
          href="/SocialApp/VSocial/?h=Home"
          className="flex gap-1 items-center"
          // onClick={() => ViewPostToUpdate()}
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
          onClick={() => MyPage()}
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

export default function HeaderV() {
  return (
    <>
      <Header />
    </>
  );
}
