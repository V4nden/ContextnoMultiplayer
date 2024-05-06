"use client";
import { makeAutoObservable } from "mobx";
import { userType } from "../player/types";
import { makePersistable } from "mobx-persist-store";
import { uuid4 } from "uuid4";

class UserStore {
  user: userType = {
    name: `Player${Math.round(Math.random() * 1000)}`,
    id: uuid4(),
    color:
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
  };

  settingsModal: boolean = false;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "UserStore",
      properties: ["user"],
      storage: localStorage,
    });
  }

  settingsModalSwitch = () => {
    this.settingsModal = !this.settingsModal;
    console.log(this.settingsModal);
  };

  setUser = (user: userType) => {
    console.log("A", user);
    this.user = user;
  };
}

export default new UserStore();
