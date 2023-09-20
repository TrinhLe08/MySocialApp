"use client";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import Recoil from "@/app/recoilContextProvider";
import { DataUser } from "../page";
import { MyPostType } from "../../Home/DeletePost/page";

function MyPost() {
  const Value: DataUser = useRecoilValue(Recoil.AtomUser);
  const ValueMyPost: MyPostType[] = useRecoilValue(Recoil.AtomMyPost);

  const router: any = useRouter();

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
    <div className="w-full pl-80 mt-20">
      <div className="grid gap-3 w-full mt-5 p-5">
        <div className="flex w-full justify-between px-8">
          <h1>Bài Đăng Của Tôi : </h1>
        </div>
        {ValueMyPost.map((p: any) => (
          <div
            className="ml-5 border-2 border-black-700 rounded-lg"
            key={p._id}
          >
            <div className="grid gap-5 p-5">
              <div className="flex items-center gap-5">
                <img
                  src={Value.linkAvatar}
                  alt=""
                  className="w-20 h-20 rounded-full text-center ml-8"
                />
                <div>
                  <p>{Value.name}</p>
                  <p>{p.time}</p>
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
  );
}

export default function MyPostV() {
  return (
    <Recoil.RecoilProvider>
      <MyPost />
    </Recoil.RecoilProvider>
  );
}
