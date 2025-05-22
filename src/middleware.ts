import { NextRequest, NextResponse } from "next/server";
// import { decodeJwt } from "jose";

const publicPaths = [
  "/login",
  "/register",
  "/_next",
  "/favicon.ico",
  "/api/auth",
];

export async function middleware(request: NextRequest) {
  if (request.method === "POST") return NextResponse.next();

  const { pathname } = request.nextUrl;

  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  const token = request.cookies.get("firebaseAuthToken")?.value;

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // const decodedToken = decodeJwt(token);
  // if (!decodedToken.admin) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  if (pathname === "/" || (token && isPublic)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
