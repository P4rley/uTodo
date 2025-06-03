"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import Image from "next/image";
import { RiExpandUpDownLine } from "react-icons/ri";
import { Separator } from "./ui/separator";
import { useClickOutside } from "@/hooks/useClickOutside";
import IconRenderer from "./IconRenderer";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

const Sidebar = () => {
  const auth = useAuth();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const [showSettings, setShowSettings] = useState(false);
  const [position, setPosition] = useState({ top: 0 });
  const [loading, setLoading] = useState(true);
  const [currentMenu, setCurrentMenu] = useState("DASHBOARD");

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

  useEffect(() => {
    if (auth) {
      if (auth.currentUser) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    } else {
      setLoading(true);
    }
  }, [auth, loading]);

  useClickOutside(modalRef, (e) => {
    if (!triggerRef.current?.contains(e.target as Node)) {
      setShowSettings(false);
    }
  });

  const menus = [
    {
      enum: "DASHBOARD",
      name: "Dashboard",
      iconName: "MdOutlineSpaceDashboard",
      iconPack: "md",
      href: "dashboard",
    },
    {
      enum: "CALENDAR",
      name: "Calendar",
      iconName: "FaRegCalendarAlt",
      iconPack: "fa",
      href: "calendar",
    },
    {
      enum: "MY_TODO",
      name: "My Todo",
      iconName: "LuListTodo",
      iconPack: "lu",
      href: "my-todo",
    },
  ];

  return (
    <div className="bg-transparent transition-all ease-in-out duration-[0.3s]">
      <div className="border flex flex-col gap-3 justify-between rounded-md border-gray-200 bg-background  py-8 px-2 md:px-4 h-[calc(100vh_-_1rem)] ">
        <div className="flex gap-2 items-end mb-4">
          <FaCheckCircle
            className="text-foreground hidden md:block"
            fontSize={24}
          />
          <span className="font-semibold text-md text-foreground">uTodo</span>
        </div>

        <div className="self-start h-full w-full overflow-auto">
          <div className="w-ful">
            {menus.map((menu) => (
              <Link
                href={`/${menu.href}`}
                key={menu.enum}
                className={`settings-text flex items-center justify-center md:justify-start gap-3 mb-[2px] ${
                  menu.enum === currentMenu && "!bg-slate-300"
                }`}
                onClick={() => setCurrentMenu(menu.enum)}
              >
                <IconRenderer
                  iconName={menu.iconName}
                  iconPack={menu.iconPack}
                  className="text-2xl md:text-[18px]"
                />
                <span className="hidden md:block">{menu.name}</span>
              </Link>
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
              <p className="settings-text">Settings</p>

              <Separator className="my-2" />

              <p className="settings-text" onClick={() => auth?.signOut()}>
                Log out
              </p>
            </div>
          )}

          <div
            className="border border-gray-200 bg-background rounded-md p-2  cursor-pointer hover:bg-gray-200 transition-all ease-in-out duration-300"
            onClick={toggleModal}
            ref={triggerRef}
          >
            <div className="flex items-center justify-center md:justify-between gap-2 ">
              {loading ? (
                <Skeleton className="w-[45px] h-[35px]" />
              ) : (
                <Image
                  src={
                    auth?.currentUser?.photoURL ||
                    "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                  }
                  width={35}
                  height={35}
                  style={{ objectFit: "cover" }}
                  alt="User Img"
                />
              )}

              <div className="justify-self-start w-full hidden md:block">
                {loading ? (
                  <Skeleton className="w-[164px] h-[16px] rounded-full mb-2" />
                ) : (
                  <p className="text-xs lg:text-sm font-bold">
                    {auth?.currentUser?.displayName}
                  </p>
                )}

                {loading ? (
                  <Skeleton className="w-[164px] h-[12px] rounded-full" />
                ) : (
                  <p className="text-[10px] lg:text-xs font-light">
                    {auth?.currentUser?.email}
                  </p>
                )}
              </div>

              {!loading && (
                <RiExpandUpDownLine className="hidden md:block" fontSize={24} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
