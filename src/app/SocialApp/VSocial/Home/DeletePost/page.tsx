"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import { ThumbsUp, Send } from "lucide-react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as Yup from "yup";
import Recoil from "@/app/recoilContextProvider";
import { DataUser } from "../../Profile/page";
import postData from "@/app/CRUDdata/postData";

export interface MyPostType {
  _id: string;
  name: string;
  userId: string;
  linkAvatar: string;
  capOfPost: string;
  arrayLike: any;
  like: boolean;
  time: string;
  linkImg: string | null;
  numberOfLike: number;
  numberOfComment: number;
  comment: any;
}

export interface ViewCommentType {
  linkAvatar: string;
  name: string;
  content: string;
}

export default function UpdateDeletePost() {
  const [mypostValue, setMyPostValue] = useRecoilState(Recoil.AtomMyPost);
  const [comment, setComment] = useRecoilState<boolean>(Recoil.AtomViewComment);
  const [commentKey, setCommentKey] = useRecoilState(Recoil.AtomCommentValue);
  const [postValue, setPostValue] = useRecoilState(Recoil.AtomPost);
  const [commentValue, setCommentValue] = useRecoilState(Recoil.AtomComment);
  const [valuePost, setValuePost] = useRecoilState(Recoil.AtomPost);
  const [value, setValue] = useRecoilState<DataUser>(Recoil.AtomUser);
  const Value: DataUser = useRecoilValue<DataUser>(Recoil.AtomUser);
  const ValueMyPost: MyPostType[] = useRecoilValue(Recoil.AtomMyPost);

  // ANT
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const DeletePost = async (id: any) => {
    const postId: string = id;
    const userId: string = Value._id;

    const deleteResult: any = await postData(
      { postId, userId },
      "https://nextsever.onrender.com/v/up-Delete-Post"
    );
    setValuePost(deleteResult.data.ViewPost);
    setMyPostValue(deleteResult.data.myPost);
    setValue(deleteResult.data.UserUpdate);
    setOpen(false);
  };

  const Like = async (id: string, like: boolean) => {
    console.log(12);

    let userId = Value._id;
    let postId = id;
    const setLike = !like;
    const responseData: any = await postData(
      { setLike, postId, userId },
      "https://nextsever.onrender.com/v/like-Post"
    );

    setPostValue(responseData.data.updatedViewPost);
    setMyPostValue(responseData.data.myPost);
    setValue(responseData.data.UserUpdate);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const ViewComment = async (id: string) => {
    setComment(true);
    setCommentKey(id);
    const postId = id;

    const response: any = await postData(
      { postId },
      "https://nextsever.onrender.com/v/view-comment-Post"
    );

    setCommentValue(response.data);
  };
  return (
    <div className="grid w-full gap-2 h-auto pl-96 pr-96 mt-5">
      <h1 className="w-full text-2xl font-semibold">Bài Viết Của Tôi : </h1>

      <div className="w-full h-atuo grid justify-center mt-4 z-10">
        {ValueMyPost.map((p: any) => (
          <div className="w-[900px] grid gap-2 h-auto pr-96 mt-5">
            <p className="w-[700px] flex items-center  gap-5  text-2xl">
              <div className="w-[700px] flex items-center  gap-5  text-2xl">
                <img
                  src={p.linkAvatar}
                  alt=""
                  className="w-20 h-20 rounded-full"
                />
                <div className="grid gap-2">
                  <span className="underline">{p.name}</span>
                  <span className="text-sm no-underline font-semibold text-slate-500">
                    {p.time}
                  </span>
                </div>
              </div>
              <Button
                type="primary"
                onClick={showModal}
                className="w-32 flex justify-center items-center font-semibold border-2 border-black-700 rounded-lg bg-black text-white text-xl"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderColor: "black",
                }}
              >
                Xóa
              </Button>
              <Modal
                title="Xác Nhận !"
                open={open}
                onOk={() => DeletePost(p._id)}
                okText="Xác Nhận "
                cancelText="Hủy"
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                cancelButtonProps={{
                  style: {
                    backgroundColor: "white",
                    color: "black",
                    borderColor: "black",
                    boxShadow: "none",
                  },
                }}
                okButtonProps={{
                  style: {
                    backgroundColor: "black",
                    color: "white",
                    borderColor: "black",
                    boxShadow: "none",
                  },
                }}
              >
                Bạn Có Chắc Muốn Xóa Bài Viết Này ?
              </Modal>
            </p>
            <p>{p.capOfPost}</p>
            <p>
              <img src={p.linkImg} alt="" className="w-[1900px] h-full" />
            </p>
            <p className="flex gap-10 text-2xl">
              <span className="flex gap-5 text-2xl">
                <span>{p.numberOflike}</span>
                <button
                  className={
                    p.like
                      ? "w-12 h-9 flex justify-center items-center border-2 border-black-700 rounded-lg bg-black text-white"
                      : "w-12 h-9 flex justify-center items-center border-2 border-black-700 rounded-lg bg-white text-black"
                  }
                  onClick={() => Like(p._id, p.like)}
                >
                  <ThumbsUp />
                </button>
              </span>
              <span className="flex gap-5 text-2xl">
                <span>{p.numberOfComment}</span>
                <button
                  className="underline"
                  onClick={() => ViewComment(p._id)}
                >
                  Bình Luận
                </button>
              </span>
            </p>
            <p className=" w-fullflex border-b-2 border-black-700 pb-4 text-2xl"></p>
          </div>
        ))}
      </div>
    </div>
  );
}
