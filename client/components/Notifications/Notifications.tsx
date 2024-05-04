"use client";
import React from "react";

import { observer } from "mobx-react-lite";
import NotificationsStore from "@/lib/store/NotificationsStore";
import { FaUser } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const Notifications = observer(() => {
  const { notifications } = NotificationsStore;
  return (
    <motion.div
      layout
      className="flex flex-col gap-2 fixed bottom-0 left-0 m-2 z-40"
    >
      <AnimatePresence mode="wait">
        {notifications.map((notification) => {
          return <Notification {...notification} />;
        })}
      </AnimatePresence>
    </motion.div>
  );
});

const Notification = ({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: React.ReactNode;
}) => {
  return (
    <motion.div
      layout
      initial={{ x: "-150%" }}
      animate={{ x: 0 }}
      exit={{ x: "-150%" }}
      transition={{ ease: [0, 1, 0, 1], duration: 1 }}
      key={title}
      className="flex items-center gap-2 border rounded-lg p-4 bg-background"
    >
      <div>{icon}</div>
      <div>
        <h1 className="font-bold text-xl">{title}</h1>
        <p>{text}</p>
      </div>
    </motion.div>
  );
};

export default Notifications;
