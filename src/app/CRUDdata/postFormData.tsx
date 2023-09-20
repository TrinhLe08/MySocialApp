"use client";
import { OjectUser } from "../LoginUser/page";
import axios from "axios";

export default async function postFormData(data: FormData | any, API: string) {
  try {
    const response = await axios.post(API, data, {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      console.log("Gửi thành công!");
    } else {
      console.log("Gửi thất bại!");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
}
