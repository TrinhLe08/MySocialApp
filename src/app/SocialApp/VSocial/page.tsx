"use client";
import { useSearchParams } from "next/navigation";
import { recoilPersist } from "recoil-persist";
import Recoil from "@/app/recoilContextProvider";
import Header from "../Header/page";
import Login from "@/app/LoginUser/page";
import HomeApp from "./Home/page";
import Search from "./Search/page";
import Profile from "./Profile/page";
import Message from "./Message/page";
import OtherProfile from "./OtherProfile/page";
import Overview from "./Profile/Overview/page";
import MyPost from "./Profile/Post/page";
import MyFriend from "./Profile/Friend/page";
import MyInfor from "./Profile/Infor/page";
import MyPassword from "./Profile/Password/page";
import Letters from "./Letters/page";

export default function VSocial() {
  const router = useSearchParams();
  const { persistAtom } = recoilPersist();
  const isLogin = router.has("log");
  return (
    <Recoil.RecoilProvider initializeState={persistAtom}>
      {!isLogin && <Header />}
      <div className="w-full h-full">
        {router.has("log") && <Login />}
        {router.has("h") && <HomeApp />}
        {router.has("se") && <Search />}
        {router.has("mes") && <Message />}
        {router.has("letters") && <Letters />}
        {router.has("profile") && <Profile Component={Overview} />}
        {router.has("pro-post") && <Profile Component={MyPost} />}
        {router.has("pro-friend") && <Profile Component={MyFriend} />}
        {router.has("pro-infor") && <Profile Component={MyInfor} />}
        {router.has("pro-password") && <Profile Component={MyPassword} />}
        {router.has("orther-profile-user") && <OtherProfile />}
      </div>
    </Recoil.RecoilProvider>
  );
}
