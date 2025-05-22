"use client";

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import Image from "next/image";
import { RiExpandUpDownLine } from "react-icons/ri";

const Sidebar = () => {
  const auth = useAuth();
  return (
    <div className="bg-transparent transition-all ease-in-out duration-[0.3s]">
      <div className="border flex flex-col gap-3 justify-between rounded-md border-gray-200 bg-gray-100  py-8 px-2 md:px-4 h-[calc(100vh_-_1rem)] ">
        <div className="flex gap-2 items-center">
          <FaCheckCircle
            className="text-foreground hidden md:block"
            fontSize={20}
          />
          <span className="font-semibold text-sm text-foreground">uTodo</span>
        </div>

        <div className="self-start h-full">Menu</div>

        <div className="border border-gray-200 bg-background rounded-md p-2 justify-self-end cursor-pointer">
          <div className="flex items-center justify-center md:justify-between gap-2 ">
            <Image
              src={
                auth?.currentUser?.photoURL ||
                "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
              }
              width={35}
              height={35}
              alt="User Img"
            />
            <div className="justify-self-start w-full hidden md:block">
              <p className="text-sm font-bold">
                {auth?.currentUser?.displayName}
              </p>

              <p className="text-xs font-light">{auth?.currentUser?.email}</p>
            </div>

            <RiExpandUpDownLine className="hidden md:block" fontSize={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
