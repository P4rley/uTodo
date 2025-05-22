"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import Image from "next/image";
import { RiExpandUpDownLine } from "react-icons/ri";
import { Separator } from "./ui/separator";
import { useClickOutside } from "@/hooks/useClickOutside";

const Sidebar = () => {
  const auth = useAuth();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const [showSettings, setShowSettings] = useState(false);
  const [position, setPosition] = useState({ top: 0 });

  const toggleModal = () => {
    setShowSettings(!showSettings);
  };

  useEffect(() => {
    if (showSettings && modalRef.current) {
      const modalHeight = modalRef.current.getBoundingClientRect().height;

      setPosition({
        top: modalHeight,
      });
    }
  }, [showSettings]);

  useClickOutside(modalRef, (e) => {
    if (!triggerRef.current?.contains(e.target as Node)) {
      setShowSettings(false);
    }
  });

  const menus = [
    { enum: "DASHBOARD", name: "Dashboard" },
    { enum: "CALENDAR", name: "Calendar" },
    { enum: "MY_TODO", name: "My Todo" },
  ];

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

        <div className="self-start h-full overflow-auto">
          <div>
            {menus.map((menu) => (
              <div key={menu.enum}>{menu.name}</div>
            ))}
          </div>
        </div>

        <div className="relative justify-self-end ">
          {showSettings && (
            <div
              className="absolute border-gray-200 bg-background rounded-md p-2 w-[250px]  shadow"
              style={{ top: `-${position.top + 7}px` }}
              ref={modalRef}
            >
              <p className="settings_text">Settings</p>

              <Separator className="my-2" />

              <p className="settings_text" onClick={() => auth?.signOut()}>
                Log out
              </p>
            </div>
          )}

          <div
            className="border border-gray-200 bg-background rounded-md p-2  cursor-pointer hover:bg-slate-100 transition-all ease-in-out duration-300"
            onClick={toggleModal}
            ref={triggerRef}
          >
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
                <p className="text-xs lg:text-sm font-bold">
                  {auth?.currentUser?.displayName}
                </p>

                <p className="text-[10px] lg:text-xs font-light">
                  {auth?.currentUser?.email}
                </p>
              </div>

              <RiExpandUpDownLine className="hidden md:block" fontSize={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
