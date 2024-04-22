"use client";
import { randomUUID } from "crypto";
import { useEffect } from "react";
import uuid4 from "uuid4";

const CreateUser = () => {
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      localStorage.setItem("user", uuid4());
    }
  }, []);

  return <></>;
};

export default CreateUser;
