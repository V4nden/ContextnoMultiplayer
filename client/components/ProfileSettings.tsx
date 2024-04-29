"use client";
import React, { useState } from "react";
import { FaCog, FaUser } from "react-icons/fa";
import { Button } from "./ui/button";
import { uuid4 } from "uuid4";
import { AnimatePresence, color, motion } from "framer-motion";
import { Input } from "./ui/input";

type Props = {};

const ProfileSettings = (props: Props) => {
  const [opened, setOpened] = useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <>
      <Button
        onClick={() => {
          setOpened(!opened);
        }}
        className="fixed top-0 right-0 m-6 aspect-square"
      >
        <FaCog size={16} />
      </Button>
      <Button
        onClick={() => {
          const newUser = {
            id: uuid4(),
            name: `Player${Math.round(Math.random() * 10000)}`,
            color:
              "#" +
              ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
          };
          setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
        }}
        className="fixed top-12 right-0 m-6 aspect-square"
      >
        <FaUser size={16} />
      </Button>

      <AnimatePresence mode="wait">
        {opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={"modal"}
            onClick={(e) => {
              if (e.target != e.currentTarget) return;

              setOpened(!opened);
            }}
            className="w-full h-full fixed top-0 left-0 flex flex-col items-center justify-center backdrop-blur-sm bg-black/40"
          >
            <div className="w-1/3 m-auto flex gap-2">
              <Input
                value={user.name}
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                  localStorage.setItem("user", JSON.stringify(user));
                }}
                placeholder="Ник"
                className="text-zinc-300 w-full"
              ></Input>
              <Input
                value={user.color}
                onChange={(e) => {
                  setUser({ ...user, color: e.target.value });
                  localStorage.setItem("user", JSON.stringify(user));
                }}
                placeholder="Цвет"
                type="color"
                className="text-zinc-300 w-fit aspect-square p-2 rounded-full"
              ></Input>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileSettings;
