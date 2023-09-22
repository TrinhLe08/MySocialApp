"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { recoilPersist } from "recoil-persist";
import Recoil from "@/app/recoilContextProvider";
import { AppProps } from "next/app";

const VSocial = dynamic(() => import("./SocialApp/VSocial/page"), {
  ssr: false,
});

// interface AppProps {
//   Component: React.ComponentType<any>;
//   pageProps: any;
// }
const App: any = ({ Component, pageProps }: AppProps) => {
  const { persistAtom } = recoilPersist();
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};
export default App;
