import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// User
const AtomUser = atom({
  key: "AtomUser",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const AtomOtherUser = atom({
  key: "AtomOtherUser",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const SelectorUser = selector({
  key: "SelectorUser",
  get: ({ get }) => {
    const value = get(AtomUser);
    return value;
  },
});

// Find
const AtomSuggestUser = atom({
  key: "AtomSuggestUser",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const AtomFindUsers = atom({
  key: "AtomFindUsers",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// Post
const AtomPost = atom({
  key: "AtomPost",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
const AtomOtherPost = atom({
  key: "AtomOtherPost",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
const AtomPostTop = atom({
  key: "PostTop",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// My Post
const AtomMyPost = atom({
  key: "AtomMyPost",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const SelectorPost = selector({
  key: "SelectorPost",
  get: ({ get }) => {
    const value = get(AtomUser);
    return value;
  },
});

// Comment
const AtomComment = atom({
  key: "AtomComment",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// View Comment
const AtomViewComment = atom({
  key: "AtomViewComment",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// Value Comment
const AtomCommentValue = atom({
  key: "AtomCommentValue",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

const SelectorComment = selector({
  key: "SelectorComment",
  get: ({ get }) => {
    const value = get(AtomUser);
    return value;
  },
});

// Message
const AtomMessageIdRoom = atom({
  key: "AtomMessageIdRoom",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

const AtomViewMessage = atom({
  key: "AtomViewMessage",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const AtomIdFriend = atom({
  key: "AtomIdFriend",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

const AtomCheckOnline = atom({
  key: "AtomCheckOnline",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const AtomNotification = atom({
  key: "AtomNotification",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

function RecoilProvider({ children }: any) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

export default {
  RecoilRoot,
  AtomUser,
  AtomOtherUser,
  AtomFindUsers,
  AtomSuggestUser,
  AtomPost,
  AtomPostTop,
  AtomMyPost,
  AtomOtherPost,
  AtomComment,
  AtomViewComment,
  AtomCommentValue,
  AtomIdFriend,
  AtomNotification,
  AtomMessageIdRoom,
  AtomViewMessage,
  AtomCheckOnline,
  SelectorPost,
  SelectorUser,
  SelectorComment,
  useRecoilState,
  useRecoilValue,
  RecoilProvider,
};
