"use client";
import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import postData from "@/app/CRUDdata/postData";
import { DataUser } from "../page";
import { Props } from "../page";

export default function MyPassword(value: Props) {
  const Value: DataUser = value.value;
  const [checkNewPassword, setCheckNewPassword] = useState(false);
  const formik: any = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(5, "Mật Khẩu Mới Phải Nhiều Hơn 5 Kí Tự !")
        .max(20, "Mật Khẩu Mới Không Được Vượt Quá 20 Kí Tự !")
        .required("Không Được Bỏ Trống Mật Khẩu !"),
      confirmNewPassword: Yup.string()
        .oneOf(
          [Yup.ref("newPassword"), undefined],
          "Xác nhận mật khẩu không khớp ."
        )
        .required("Vui lòng xác nhận mật khẩu !"),
    }),
    onSubmit: async (values: any) => {
      const userId: string = Value._id;
      const updatePassword: any = await postData(
        { values, userId },
        "https://nextsever.onrender.com/v/check-user-update-password"
      );

      console.log(updatePassword.status);

      if (updatePassword.status == 201) {
        setCheckNewPassword(true);
        return;
      }
    },
  });

  return (
    <div className="grid justify-center items-center w-full h-2/3 pl-80 mt-24 pr-9">
      <div>
        <div>
          <form onSubmit={formik.handleSubmit} className="w-80 mb-4">
            <input
              type="password"
              value={formik.values.oldPassword}
              name="oldPassword"
              onChange={formik.handleChange}
              placeholder="Nhập Mật Khẩu Cũ ."
              className="bg-white border border-teal-400 focus:border-teal-500 rounded-md py-2 px-4 w-full mt-5 h-9"
            />

            <p className="text-red-500 text-xs mr-80 w-80 mt-2 h-2">
              {formik.errors.oldPassword && formik.touched.oldPassword
                ? formik.errors.oldPassword
                : null}
              {checkNewPassword ? "Sai Mật Khẩu " : null}
            </p>

            <input
              type="password"
              value={formik.values.newPassword}
              name="newPassword"
              onChange={formik.handleChange}
              placeholder="Nhập Mật Khẩu Mới ."
              className="bg-white border border-teal-400 focus:border-teal-500 rounded-md py-2 px-4 w-full mt-5 h-9"
            />

            <p className="text-red-500 text-xs mr-80 w-80 mt-2 h-2">
              {formik.errors.newPassword && formik.touched.newPassword
                ? formik.errors.newPassword
                : null}
            </p>

            <input
              type="password"
              value={formik.values.confirmNewPassword}
              name="confirmNewPassword"
              onChange={formik.handleChange}
              placeholder="Xác Nhân Lại Mật Khẩu ."
              className="bg-white border border-teal-400 focus:border-teal-500 rounded-md py-2 px-4 w-full mt-5 h-9"
            />

            <p className="text-red-500 text-xs mr-80 w-80 mt-2 h-2">
              {formik.errors.confirmNewPassword &&
              formik.touched.confirmNewPassword
                ? formik.errors.confirmNewPassword
                : null}
            </p>

            <button
              className="bg-black hover:bg-gray-800 text-white font-xs text-sm py-2 px-4 rounded-md w-80 h-9 mt-2"
              value="Submit"
              type="submit"
            >
              Lưu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
