"use client";
import React, { useEffect } from "react";
import Login from "./LoginUser/page";
interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Login />
    </>
  );
};

export default App;
