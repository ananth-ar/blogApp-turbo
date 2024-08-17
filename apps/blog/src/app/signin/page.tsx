"use client";

import { signIn, useSession } from "next-auth/react";


const SignInPage = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br gap-1 from-cyan-300 to-sky-600 h-[86vh]">
      <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
        {status === "authenticated" ? (
          <div>your already signed in {session && session.user!.name}</div>
        ) : (
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
        font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
         dark:focus:ring-blue-800"
            onClick={async () =>
              await signIn("google", {
                redirect: true,
                callbackUrl: "/",
              })
            }
          >
            Sign In with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
