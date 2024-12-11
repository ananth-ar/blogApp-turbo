import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";


const publicRoutes = ["/", "/signin", "/blog", "/search", "/[profile]"];

export async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  const { pathname } = req.nextUrl;
  if (
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.match("/blog/") ||
    pathname.match(/^\/@[\w-]+$/) ||
    pathname.match("/uploads")
  ) {
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    const loginUrl = new URL("/signin", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (req.nextUrl.pathname === "/setting") {
    return NextResponse.redirect(new URL("/setting/edit-profile", req.url));
  }

  if (req.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard/blogs", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
