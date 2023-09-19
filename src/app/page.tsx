"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";


const VSocial = dynamic(() => import("./SocialApp/VSocial/page"), {
  ssr: false,
});

interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}
const App: any = () => {
  return <VSocial />;
};

export default App;
