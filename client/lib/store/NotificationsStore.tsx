import { makeAutoObservable } from "mobx";

class NotificationsStore {
  notifications: { text: string; title: string; icon: React.ReactNode }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  notify = (notification: {
    text: string;
    title: string;
    icon: React.ReactNode;
  }) => {
    setTimeout(() => {
      this.notifications.shift();
    }, 5000);
    this.notifications = [...this.notifications, notification];
  };
}

export default new NotificationsStore();
