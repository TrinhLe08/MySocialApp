"use client";
import Link from "next/link";
import Recoil from "@/app/recoilContextProvider";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import { DataUser } from "../page";
import { MyPostType } from "../../Home/DeletePost/page";

function Overview() {
  const Value: DataUser = useRecoilValue(Recoil.AtomUser);
  const ValueMyPost: MyPostType[] = useRecoilValue(Recoil.AtomMyPost);
  const router: any = useRouter();

  let Statistical = [
    {
      number: Value.numberOfPost,
      category: "Bài Viết",
    },
    {
      number: Value.numberOfLike,
      category: "Lượt Like",
    },
    {
      number: Value.numberOfComment,
      category: "Bình Luận",
    },
    {
      number: Value.numberOfFollow,
      category: "Bạn Bè",
    },
  ];

  const ToPost = (id: string) => {
    router.push("/SocialApp/VSocial?h=Home");
    const scrollToElement = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    setTimeout(() => {
      scrollToElement(id);
    }, 500);
  };

  return (
    <div className="w-full pl-80 mt-24 pr-9">
      <div className="flex gap-10 w-full ml-3 justify-between text-4xl text-center">
        {Statistical.map((value: any, item) => (
          <div
            className="grid w-52 gap-4 p-2 border-2 border-black-700 rounded-lg"
            key={value.category}
          >
            <p>{value.number}</p>
            <p>{value.category}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 w-full mt-5">
        <div className="flex w-full justify-between px-8">
          <h1>Bài Đăng Gần Đây : </h1>
          <Link
            className="underline"
            href="/SocialApp/VSocial/?pro-post=Post"
          >{`Toàn Bộ Bài Đăng >>>`}</Link>
        </div>
        <div className="grid gap-2  ">
          {ValueMyPost.map((p: any) => (
            <div
              className="ml-5 border-2 border-black-700 rounded-lg"
              key={p._id}
            >
              <div className="grid gap-5 p-5">
                <div className="flex items-center gap-5">
                  <img
                    src={p.linkAvatar}
                    alt=""
                    className="w-20 h-20 rounded-full text-center ml-8"
                  />
                  <div>
                    <p>{p.name}</p>
                    <p>{p.timeOfPost}</p>
                  </div>
                </div>
                <p>{p.capOfPost}</p>
                <div className="flex gap-10 text-center">
                  <span>{p.numberOflike} Like</span>
                  <span>{p.numberOfComment} Comment</span>
                  <button
                    className="flex w-full justify-end underline"
                    onClick={() => ToPost(p._id)}
                  >
                    Xem Thêm
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OverviewV() {
  return (
    <Recoil.RecoilProvider>
      <Overview />
    </Recoil.RecoilProvider>
  );
}
