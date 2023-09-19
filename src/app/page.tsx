"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";

const Login = dynamic(() => import("./LoginUser/page"), { ssr: false });

interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}
const App: any = () => {
  return <>404 Not Foud</>;
};

export default App;
