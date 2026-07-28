// import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const AUTH_ROUTES = ["/login", "/register"];
// const PUBLIC_ROUTE = ["/", "/news", "/login", "/register"];
const PUBLIC_ROUTE = ["/", "/news"];
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  //   const cookieStore = await cookies();
  //   const accessToken = cookieStore.get("accessToken");

  const accessToken = request.cookies.get("accessToken")?.value;

  const decodedToken = accessToken
    ? (jwt.decode(accessToken) as JwtPayload)
    : null;

  let userRole = null;

  if (decodedToken) {
    userRole = decodedToken.role;
  }
  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "USER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (userRole === "AUTHOR") {
      return NextResponse.redirect(new URL("/author-dashboard", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  const isPublicRoute = PUBLIC_ROUTE.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  //authenticated pages protection 
  if(!accessToken && !isPublicRoute && !isAuthRoute){
 return NextResponse.redirect(new URL('/login', request.url))
  }

  if (pathname.startsWith("/dashboard") && userRole !== "USER"){
    return NextResponse.redirect(new URL('/not-found', request.url));
  } else if(pathname.startsWith("/author-dashboard") && userRole !== "AUTHOR"){
    return NextResponse.redirect(new URL('/not-found', request.url));
  } else if(pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN"){
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    // "/dashboard/:path*",
    // "/author-dashboard/:path*",
    // "/admin-dashboard/:path*",
    // "/login",
    // "/register"
    "/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)",
  ],
};
