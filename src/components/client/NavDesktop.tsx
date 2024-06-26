"use client";

import Link from "next/link";
import React from "react";
import { CiMedicalCase } from "react-icons/ci";
import { FiHome, FiMessageSquare, FiUser } from "react-icons/fi";
import { GrMapLocation } from "react-icons/gr";

const NavDesktop = () => {
  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: <FiHome />,
      subItems: ["Home", "About", "Contact"],
    },
    {
      name: "Network",
      path: "/network",
      icon: <FiUser />,
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: <CiMedicalCase strokeWidth={1} />,
    },
    {
      name: "Venues",
      path: "/venue",
      icon: <GrMapLocation />,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: <FiMessageSquare />,
    },
  ];
  return (
    <div className="flex gap-4 items-center justify-center">
      {menuItems.map((menuItem) => (
        <Link
          key={menuItem.name}
          href={menuItem.path}
          className="px-2 text-base cursor-pointer flex gap-2 items-center"
        >
          {menuItem.name === "Messages" ? (
            <div className="relative">
              <div className="text-xl">{menuItem.icon}</div>
              <div className="text-white absolute font-medium -top-[7px] -right-[7px] h-4 w-4 px-1 py-1 flex text-[10px] items-center justify-center bg-red-500 rounded-full">
                3
              </div>
            </div>
          ) : (
            <div className="text-xl">{menuItem.icon}</div>
          )}
          {menuItem.name}
        </Link>
      ))}
    </div>
  );
};

export default NavDesktop;
