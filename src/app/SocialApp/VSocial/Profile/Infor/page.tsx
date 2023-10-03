"use client";
import dotenv from "dotenv";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";
import { useFormik } from "formik";
import { useRecoilState, useRecoilValue } from "recoil";
import Recoil from "@/app/recoilContextProvider";
import { DataUser } from "../page";
import postFormData from "@/app/CRUDdata/postFormData";
dotenv.config();

function MyInfor() {
  const [spinConnect, setSpinConnect] = useState(false);
  const Value: DataUser = useRecoilValue(Recoil.AtomUser);
  const [user, setUser] = useRecoilState(Recoil.AtomUser);
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 50,
        color: "black",
      }}
      spin
    />
  );
  let input1: any = useRef(null);
  let input2: any = useRef(null);

  const formik = useFormik({
    initialValues: {
      fileImg: null,
      fileAvatar: null,
      newName: "",
      newAddress: "",
    },
    onSubmit: async (values: any) => {
      setSpinConnect(true);
      input1.current.value = "";
      input2.current.value = "";

      const formData = new FormData();
      const keyUpdateData = Value._id;

      // Đưa vào form data
      formData.append("fileAvatar", values.fileAvatar || Value.linkAvatar);
      formData.append("fileImg", values.fileImg || Value.linkImg);
      formData.append("userId", keyUpdateData);
      formData.append("userName", values.newName || Value.name);
      formData.append("userAddress", values.newAddress || Value.address);

      const responsiveData: any = await postFormData(
        formData,
        `${process.env.NEXT_PUBLIC_URL_SERVER}/v/check-user-update`
      );
      setUser(responsiveData.data);
      setSpinConnect(false);
    },
  });

  return (
    <>
      {spinConnect ? (
        <div className="w-full h-screen mt-[-0px] z-50 mt-20 items-center bg-gray-300 bg-opacity-50 flex justify-center z-2 absolute top-0">
          <Spin indicator={antIcon} className="relative" />
        </div>
      ) : null}
      <div className="w-full pl-80 mt-24 pr-9 ">
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="relative">
              <img
                src={Value.linkImg}
                alt=""
                className="w-full h-64 pl-8 rounded-lg"
              />
              <div className="w-full flex justify-end mt-2">
                <label
                  htmlFor="fileImg"
                  className="flex justify-center items-center w-40 h-12 border-2 ml-10 border-black-700 rounded-lg bg-black text-white"
                >
                  Cập Nhật Ảnh
                </label>
                <input
                  type="file"
                  id="fileImg"
                  className="hidden"
                  accept="image/*"
                  onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                      formik.setFieldValue("fileImg", event.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>

            <div className=" grid gap-4 justify-center absolute top-72 left-1/2">
              <img
                src={Value.linkAvatar}
                alt=""
                className="w-40 h-40 rounded-full text-center ml-8"
              />
              <div className="w-full flex justify-end">
                <label
                  htmlFor="fileAvatar"
                  className="flex justify-center items-center w-40 h-12 border-2 ml-10 border-black-700 rounded-lg bg-black text-white"
                >
                  Cập Nhật Ảnh
                </label>
                <input
                  type="file"
                  id="fileAvatar"
                  className="hidden"
                  accept="image/*"
                  onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                      formik.setFieldValue("fileAvatar", event.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>

            <div className="grid gap-3 w-full justify-center text-center mt-28 pr-10">
              <div>
                <p>Tên : </p>
                <input
                  type="name"
                  name="newName"
                  onChange={formik.handleChange}
                  placeholder="Nhập Tên Mới ."
                  className="w-80 h-9 pl-5 text-sm border-2 border-black-700 rounded-lg"
                  ref={input1}
                />
              </div>

              <div>
                <p>Địa Chỉ : </p>
                <input
                  type="name"
                  // value={Value.adress ? Value.adress : " Chưa cập nhật"}
                  name="newAddress"
                  onChange={formik.handleChange}
                  placeholder="Nhập Địa Chỉ ."
                  className="w-80 h-9 pl-5 text-sm border-2 border-black-700 rounded-lg"
                  ref={input2}
                />
              </div>

              <button
                value="Submit"
                type="submit"
                className="text-2xl w-40 h-12 border-2 ml-20 border-black-700 rounded-lg bg-black text-white"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default function MyInforV() {
  return (
    <>
      <MyInfor />
    </>
  );
}
