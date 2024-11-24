"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { socket } from "../lib/service/socket";
import { ToggleTheme } from "./ToggleTheme";
import { ThemeContext } from "@/providers/ThemeContext";
import SearchBar from "./SearchBar";
import ProfileDropDown from "./ProfileDropDown";
import { Bell, SquarePen } from "lucide-react";
import { Separator } from "./ui/separator";

const NavBar = () => {
  const [notification, setNotification] = useState();
  const { status, data: session } = useSession();
  const { changeTheme } = useContext(ThemeContext);

  useEffect(() => {
    socket.on("avaliabeNotification", (data) => {
      console.log("avaliabeNotification ", data);
      setNotification(data);
    });
  }, [session]);

  return (
    <div>
      <div className="flex ">
        <div className="w-[50%]">
          <SearchBar />
        </div>
        <div className="flex justify-end w-[50%] mt-3 mb-2">
          <Link className="flex text-zinc-200 pt-2 px-4" href="/editor">
            <span className="pr-2 text-gray-500 dark:text-gray-100">
              write
            </span>
            <SquarePen
              size={20}
              strokeWidth={1}
              className="text-gray-600 dark:text-gray-100"
            />
          </Link>
          {status === "authenticated" ? (
            <div className="flex">
              <div className="pt-2 px-4">
                <div className="indicator">
                  <Link
                    href="/dashboard/notifications"
                    className="text-cyan-50"
                  >
                    <Bell
                      size={21}
                      strokeWidth={1.2}
                      absoluteStrokeWidth={false}
                      className="text-gray-600 dark:text-gray-100"
                    />

                    {notification != 0 && (
                      <span className="indicator-item badge h-4 bg-red-600 border-0 text-white text-xs">
                        {notification}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
              <div className="px-3 pt-[2px]">
                <ProfileDropDown />
              </div>
            </div>
          ) : (
            <Link className="text-zinc-200 p-2" href="/signin">
              sign in
            </Link>
          )}
          <div className="pr-2">
            <ToggleTheme handleOnClick={changeTheme} />
          </div>
        </div>
      </div>
      <Separator className="bg-zinc-200 h-[0.5px]" />
    </div>
  );
};

export default NavBar;
