"use client";
import axios from "axios";

export default async function sendToken(token: any, API: string) {
  try {
    const sendToServer = await axios.get(API, {
      headers: {
        Authorization: `Bearer${token}`,
      },
    });
    if (sendToServer.status === 200) {
      console.log("Token It Ok !");
    } else {
      console.log("Token Failed!");
    }
    return sendToServer;
  } catch (error) {
    console.error(error);
  }
}
