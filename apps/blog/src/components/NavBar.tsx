"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { socket } from "../lib/service/socket";
import { ToggleTheme } from "./ToggleTheme";
import { ThemeContext } from "@/providers/ThemeContext";

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
    <div className="flex bg-slate-900 p-3 space-x-3">
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
          {/* <span className="indicator-item badge badge-primary">new</span>
          <div className="bg-base-300 grid h-2 w-20 place-items-center">
            content
          </div> */}
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
      {/* <input
        type="checkbox"
        value="cupcake"
        className="toggle theme-controller"
      /> */}
    </div>
  );
};

export default NavBar;
