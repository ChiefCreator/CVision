import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
	const protectedRoutes = ["/"];
  const excludedPaths = ["/auth/login", "/auth/register", "/auth"];

  if (pathname === "/auth") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

	if (!excludedPaths.includes(pathname) && protectedRoutes.some(path => pathname.startsWith(path))) {
    const cookie = req.cookies.get("sid");

    if (!cookie) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

	return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};