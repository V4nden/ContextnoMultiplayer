"use client";
import UserStore from "@/lib/store/UserStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { uuid4 } from "uuid4";

const ProfileButton = observer(() => {
  const { user, settingsModalSwitch } = UserStore;

  return user ? (
    <button
      className="flex gap-2 items-center transition-all hover:drop-shadow-glow"
      onClick={() => {
        settingsModalSwitch();
      }}
    >
      <span
        className="w-4 h-4 rounded-full"
        style={{
          background: `linear-gradient(45deg, ${user.color}ff 0%, ${user.color}88 100%)`,
        }}
      ></span>
      <span className="font-bold">{user.name}</span>
    </button>
  ) : (
    <div className="flex gap-2 items-center">
      {String(user)}
      <span
        className="w-4 h-4 rounded-full opacity-50"
        style={{
          background: `linear-gradient(45deg, #999999ff 0%, #99999988 100%)`,
        }}
      ></span>
      <span
        style={{
          background: `linear-gradient(45deg, #999999ff 0%, #999999aa 100%)`,
        }}
        className="w-16 h-4 rounded-full opacity-50"
      ></span>
    </div>
  );
});

export default ProfileButton;
