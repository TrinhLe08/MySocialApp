"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { recoilPersist } from "recoil-persist";
import Recoil from "@/app/recoilContextProvider";

const VSocial = dynamic(() => import("./SocialApp/VSocial/page"), {
  ssr: false,
});

interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}
const App: any = () => {
  const { persistAtom } = recoilPersist();
  return (
    <Recoil.RecoilProvider initializeState={persistAtom}>
      <VSocial />;
    </Recoil.RecoilProvider>
  );
};
export default App;
