"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useFormik } from "formik";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import * as Yup from "yup";
import postData from "../CRUDdata/postData";

export interface OjectRegister {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [spin, setSpin] = useState(false);
  const [register, setRegister]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(true);
  const router = useRouter();
  const antIcon: JSX.Element = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "black",
      }}
      spin
    />
  );
  const formik: any = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "Tên Phải Nhiều Hơn 5 Kí Tự !")
        .max(15, "Tên Không Được Vượt Quá 15 Kí Tự !")
        .required("Không Được Bỏ Trống Tên !"),
      password: Yup.string()
        .min(5, "Mật Khẩu Phải Nhiều Hơn 5 Kí Tự !")
        .max(20, "Mật Khẩu Không Được Vượt Quá 20 Kí Tự !")
        .required("Không Được Bỏ Trống Mật Khẩu !"),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), undefined],
          "Xác nhận mật khẩu không khớp ."
        )
        .required("Vui lòng xác nhận mật khẩu !"),
    }),
    onSubmit: async (values: OjectRegister) => {
      setSpin(true);

      const dataValues: any = {
        username: values.username,
        password: values.password,
        address: "",
        linkImg:
          "https://i.pinimg.com/originals/24/3b/5a/243b5a0db0031c6753485e5f884bd164.png",
        linkAvatar:
          "https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg",
        connect: [],
        friend: [],
        Post: [],
        checkConnect: false,
        numberOfPost: 0,
        numberOfFollow: 0,
        numberOfLike: 0,
        numberOfDislike: 0,
        numberOfComment: 0,
      };
      const registerData: any = await postData(
        dataValues,
        "https://nextsever.onrender.com/v/register"
      );

      if (registerData.status === 201) {
        setSpin(false);
        setRegister(false);
      } else if (registerData.status != 200) {
        setSpin(false);
        setRegister(true);
      } else if (registerData.status === 200) {
        setSpin(false);
        router.push("/SocialApp/VSocial?log=Login");
      }
    },
  });

  return (
    <div>
      <div>
        <Link
          href="/SocialApp/VSocial?log=Login"
          className="relative w-28 h-10 z-10 top-16 left-16 translate-y-[30px] translate-x-[40px] hover:bg-gray-100 p-5"
        >
          <span className="mr-2 ">↚ </span>
          Quay Lại
        </Link>
      </div>

      <div className="w-full h-screen relative flex justify-center items-center">
        {spin ? (
          <div className="w-full h-screen flex justify-center items-center z-999 absolute bg-gray-300 bg-opacity-50 top-0">
            <Spin indicator={antIcon} className="relative" />
          </div>
        ) : null}
        <div className="w-80 text-center mb-20">
          <div className="Icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="mx-auto h-6 w-6 mb-2"
            >
              <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
              <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
            </svg>
          </div>

          <div className="text-2xl font-semibold">
            Đăng Kí Tài Khoản Ngay Bây Giờ .
          </div>

          <p className="text-teal-800 text-sm w-80 mt-3 mb-3">
            Điền Thông Tin Đăng Kí Của Bạn Tại Đây .
          </p>

          <form onSubmit={formik.handleSubmit} className="w-80 mb-4">
            <input
              type="name"
              value={formik.values.username}
              name="username"
              onChange={formik.handleChange}
              placeholder="Điền Tên Đăng Kí ."
              className="bg-white border border-teal-400 focus:border-teal-500 rounded-md py-2 px-4 w-full mt-5 h-9"
            />

            <p className="text-red-500 text-xs mr-80 w-80 mt-2 h-2">
              {formik.errors.username && formik.touched.username
                ? formik.errors.username
                : null}
              {!register ? "Tên Bị Trùng !" : null}
            </p>

            <input
              type="password"
              value={formik.values.password}
              name="password"
              onChange={formik.handleChange}
              placeholder="Điền Mật Khẩu Đăng Kí ."
              className="bg-white border border-teal-400 focus:border-teal-500 rounded-md py-2 px-4 w-full mt-5 h-9"
            />

            <p className="text-red-500 text-xs mr-80 w-80 mt-2 h-2">
              {formik.errors.password && formik.touched.password
                ? formik.errors.password
                : null}
            </p>

            <input
              type="password"
              value={formik.values.confirmPassword}
              name="confirmPassword"
              onChange={formik.handleChange}
              placeholder="Xác Nhân Lại Mật Khẩu ."
              className="bg-white border border-teal-400 focus:border-teal-500 rounded-md py-2 px-4 w-full mt-5 h-9"
            />

            <p className="text-red-500 text-xs mr-80 w-80 mt-2 h-2">
              {formik.errors.confirmPassword && formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : null}
            </p>

            <button
              className="bg-black hover:bg-gray-800 text-white font-xs text-sm py-2 px-4 rounded-md w-80 h-9 mt-2"
              value="Submit"
              type="submit"
            >
              Đăng Kí Ngay
            </button>
          </form>

          <Link
            href="/SocialApp/VSocial?log=Login"
            className="text-teal-800 underline font-light text-sm mt-20"
          >
            Quay Về Trang Đăng Nhập .
          </Link>
        </div>
      </div>
    </div>
  );
}
