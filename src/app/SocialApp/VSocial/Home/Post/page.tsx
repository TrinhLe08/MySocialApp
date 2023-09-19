"use client";
import React from "react";
import { useFormik } from "formik";
import { useRecoilState, useRecoilValue } from "recoil";
import * as Yup from "yup";
import Recoil from "@/app/recoilContextProvider";
import { DataUser } from "../../Profile/page";
import { MyPostType } from "../DeletePost/page";
import postFormData from "@/app/CRUDdata/postFormData";

export default function MyPost() {
  const [value, setValue] = useRecoilState(Recoil.AtomUser);
  const [valuePost, setValuePost] = useRecoilState(Recoil.AtomPost);
  const [valueUser, setValueMyPost] = useRecoilState(Recoil.AtomMyPost);
  const Value: DataUser = useRecoilValue(Recoil.AtomUser);
  const ValuePost: MyPostType[] = useRecoilValue(Recoil.AtomPost);
  const formik: any = useFormik({
    initialValues: {
      content: "",
      Img: null,
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values: any) => {
      if (values.content == "" && values.Img == null) {
        return;
      }
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      // Thời gian
      const formattedDate =
        "Đăng Vào " +
        day +
        "/" +
        month +
        "/" +
        year +
        " " +
        ", Lúc " +
        currentDate.toLocaleTimeString();
      const formData = new FormData();
      const keyUpdateData = Value._id;
      const name = Value.name;
      const linkAvatar = Value.linkAvatar;
      // Đưa vào form data
      if (values.Img == null) {
        formData.append("upPost", `${undefined}`);
      } else {
        formData.append("upPost", values.Img);
      }
      formData.append("userId", keyUpdateData);
      formData.append("userName", name);
      formData.append("linkAvatar", linkAvatar);
      formData.append("content", values.content);
      formData.append("time", formattedDate);

      const responseData: any = await postFormData(
        formData,
        "https://nextsever.onrender.com/v/up-Post"
      );
      let ViewPost: MyPostType[] = responseData.data.ViewPost;
      const lastElement: MyPostType | undefined = ViewPost.pop();
      if (lastElement !== undefined) {
        ViewPost.unshift(lastElement);
        setValuePost(ViewPost);
        setValueMyPost(responseData.data.myPost);
        setValue(responseData.data.UserUpdate);
      }
    },
  });
  return (
    <div>
      <div className="flex items-center gap-5">
        <img
          src={Value.linkAvatar}
          alt=""
          className="w-20 h-20 rounded-full text-center ml-8"
        />
        <div className="grid gap-2">
          <h1 className=" text-2xl">{Value.name}</h1>
          <p className="text-slate-500">Bây Giờ</p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full flex justify-center mt-3">
          <textarea
            id="content"
            name="content"
            rows={4}
            cols={50}
            placeholder="Nội Dung Bài Viết ."
            className="pl-5 pt-5 border-2 border-black-700 "
            onChange={formik.handleChange}
            value={formik.values.content}
          ></textarea>
        </div>
        <p className="text-red-500 text-xs mr-80 w-80 mt-2 h-2">
          {formik.errors.content && formik.touched.content
            ? formik.errors.content
            : null}
        </p>

        <div className="flex gap-10 mt-3 text-xl">
          <label className="w-20 h-8 underline" htmlFor="Img">
            File
          </label>
          <input
            type="file"
            id="Img"
            className="hidden"
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                formik.setFieldValue("Img", event.target.files[0]);
              }
            }}
          />
        </div>

        <div className="flex justify-end">
          <button
            value="Submit"
            type="submit"
            className=" w-40 mt-5 border-black-700 rounded-lg bg-black text-white text-lg"
          >
            Đăng
          </button>
        </div>
      </form>
    </div>
  );
}
