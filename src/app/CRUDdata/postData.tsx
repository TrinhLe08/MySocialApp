"use client";
import { OjectUser } from "../LoginUser/page";
import axios from "axios";

export default async function postData(data: OjectUser | any, API: string) {
  try {
    const response = await axios.post(API, data, {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("Submit successful!");
    } else {
      console.log("Submit failed!");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
}
