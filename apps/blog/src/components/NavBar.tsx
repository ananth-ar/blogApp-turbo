"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { socket } from "../lib/service/socket";
import { ToggleTheme } from "./ToggleTheme";
import { ThemeContext } from "@/providers/ThemeContext";
import SearchBar from "./SearchBar";
import ProfileDropDown from "./ProfileDropDown";

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
    <div className="flex bg-slate-900">
      <div className="w-[50%]">
        <SearchBar />
        <ProfileDropDown />
      </div>
      <div className="w-[50%]">
        {status === "authenticated" ? (
          <div className="flex">
            <a
              className="text-zinc-200 pr-3"
              onClick={async () => await signOut()}
            >
              sign out
            </a>
            <div className="indicator">
              <Link href="/dashboard/notifications" className="text-cyan-50">
                notifications
                <span className="indicator-item badge h-4 bg-red-600 border-0 text-white text-xs">
                  {notification}
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <Link className="text-zinc-200" href="/signin">
            sign in
          </Link>
        )}
        <div className="text-zinc-200">{session && session.user!.name}</div>
        <Link className="text-zinc-200" href="/editor">
          write
        </Link>
        <ToggleTheme handleOnClick={changeTheme} />
      </div>
    </div>
  );
};

export default NavBar;
