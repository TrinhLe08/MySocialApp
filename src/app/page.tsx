"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RecoilRoot } from "recoil";
import { recoilPersist } from "recoil-persist";
import Recoil from "@/app/recoilContextProvider";
import { AppProps } from "next/app";

const Header = dynamic(() => import("./SocialApp/Header/page"), { ssr: false });
const Login = dynamic(() => import("@/app/LoginUser/page"), { ssr: false });
const HomeApp = dynamic(() => import("./SocialApp/VSocial/Home/page"), {
  ssr: false,
});
const Search = dynamic(() => import("./SocialApp/VSocial/Search/page"), {
  ssr: false,
});
const Profile = dynamic(() => import("./SocialApp/VSocial/Profile/page"), {
  ssr: false,
});
const Message = dynamic(() => import("./SocialApp/VSocial/Message/page"), {
  ssr: false,
});
const OtherProfile = dynamic(
  () => import("./SocialApp/VSocial/OtherProfile/page"),
  {
    ssr: false,
  }
);
const Overview = dynamic(
  () => import("./SocialApp/VSocial/Profile/Overview/page"),
  {
    ssr: false,
  }
);
const MyPost = dynamic(() => import("./SocialApp/VSocial/Profile/Post/page"), {
  ssr: false,
});
const MyFriend = dynamic(
  () => import("./SocialApp/VSocial/Profile/Friend/page"),
  { ssr: false }
);
const MyInfor = dynamic(
  () => import("./SocialApp/VSocial/Profile/Infor/page"),
  { ssr: false }
);
const MyPassword = dynamic(
  () => import("./SocialApp/VSocial/Profile/Password/page"),
  {
    ssr: false,
  }
);
const Letters = dynamic(() => import("./SocialApp/VSocial/Letters/page"), {
  ssr: false,
});

const VSocial = dynamic(() => import("./SocialApp/VSocial/page"), {
  ssr: false,
});

const App: any = ({ Component, pageProps }: AppProps) => {
  const { persistAtom } = recoilPersist();
  return (
    <Recoil.RecoilProvider initializeState={persistAtom}>
      <VSocial />
    </Recoil.RecoilProvider>
  );
};
export default App;
