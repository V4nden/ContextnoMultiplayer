"use client";
import { randomUUID } from "crypto";
import { useEffect } from "react";
import uuid4 from "uuid4";

const CreateUser = () => {
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: uuid4(),
          name: `Player${Math.round(Math.random() * 10000)}`,
          color:
            "#" +
            ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
        })
      );
    }
  }, []);

  return <></>;
};

export default CreateUser;
