"use client";

import UserStore from "@/lib/store/UserStore";
import { observer } from "mobx-react-lite";
import Modal from "../ui/modal";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

const ProfileSettings = observer(() => {
  const { user, settingsModal, settingsModalSwitch, setUser } = UserStore;

  const [profile, setProfile] = useState(user);

  useEffect(() => {
    setUser(profile);
  }, [profile]);

  return (
    <>
      {user && (
        <Modal opened={settingsModal} setOpened={settingsModalSwitch}>
          <h1 className="text-3xl font-bold text-zinc-100">
            Настройки профиля
          </h1>
          <h1 className="text-2xl font-bold text-zinc-300">Ник</h1>
          <Input
            value={profile.name}
            onChange={(e) => {
              setProfile({ ...profile, name: e.target.value });
            }}
          ></Input>
          <h1 className="text-2xl font-bold text-zinc-300">Цвет</h1>
          <input
            onChange={(e) => {
              setProfile({ ...profile, color: e.target.value });
            }}
            value={profile.color}
            type="color"
            className="rounded-md bg-zinc-950 border p-2 w-full h-10"
          ></input>
        </Modal>
      )}
    </>
  );
});

export default ProfileSettings;