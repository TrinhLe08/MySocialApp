"use client";
import { useFormik } from "formik";
import { useRecoilState } from "recoil";
import Recoil from "@/app/recoilContextProvider";
import { DataUser } from "../page";
import { Props } from "../page";
import postFormData from "@/app/CRUDdata/postFormData";

export default function MyInfor(value: Props) {
  const Value: DataUser = value.value;
  const [user, setUser] = useRecoilState(Recoil.AtomUser);

  const formik = useFormik({
    initialValues: {
      fileImg: null,
      fileAvatar: null,
      newName: "",
      newAddress: "",
    },
    onSubmit: async (values: any) => {
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
        "http://localhost:8080/v/check-user-update"
      );

      setUser(responsiveData.data);
    },
  });

  return (
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
  );
}
