import { makeAutoObservable } from "mobx";
import { userType } from "../player/types";

class UserStore {
  user: userType = JSON.parse(localStorage.getItem("user"));

  settingsModal: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  settingsModalSwitch = () => {
    this.settingsModal = !this.settingsModal;
    console.log(this.settingsModal);
  };

  setUser = (user: userType) => {
    console.log("A", user);
    localStorage.setItem("user", JSON.stringify(user));
    this.user = user;
  };
}

export default new UserStore();
