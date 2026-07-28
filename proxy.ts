// // import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { jwtUtils } from "./app/utils/jwt";
// import { cookies } from "next/headers";
// import { getNewAccessToken } from "./service/refreshToken";

// const AUTH_ROUTES = ["/login", "/register"];
// // const PUBLIC_ROUTE = ["/", "/news", "/login", "/register"];
// const PUBLIC_ROUTE = ["/", "/news"];
// export async function proxy(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;
//   const cookieStore = await cookies();
//   //   const accessToken = cookieStore.get("accessToken");

//   //Decode Refresh Token
//   const refreshToken = request.cookies.get("refreshToken")?.value || null;
//   const decodedRefreshToken = refreshToken
//     ? await jwtUtils.verifyToken(
//         refreshToken,
//         process.env.JWT_ACCESS_SECRET as string,
//       )
//     : null;
//   // Decode Access Token
//   let accessToken = request.cookies.get("accessToken")?.value || null;
//   let decodedAccessToken = accessToken
//     ? await jwtUtils.verifyToken(
//         accessToken,
//         process.env.JWT_ACCESS_SECRET as string,
//       )
//     : null;

//   // Check Refresh TOken

//   if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
//     //Access Token expired but refresh token exits then get new access token
//     const result = await getNewAccessToken();
//     if (result.success) {
//       const newAccessToken = result.data.accessToken;
//       cookieStore.set("accessToken", newAccessToken, {
//         httpOnly: true,
//         maxAge: 60 * 60 * 24,
//         sameSite: "lax",
//       });
//       accessToken = newAccessToken;
//       decodedAccessToken = await jwtUtils.verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET as string)
//     }
//   }

//   let userRole = null;

//   if (!decodedAccessToken?.success) {
//     // expire hoye gele log out kore debe
//     cookieStore.delete("accessToken");
//     // return NextResponse.redirect(new URL("/login", request.url));
//   }
//   if (decodedAccessToken?.success && decodedAccessToken.data) {
//     userRole = (decodedAccessToken.data as JwtPayload).role;
//   }

//   if (accessToken && AUTH_ROUTES.includes(pathname)) {
//     if (userRole === "USER") {
//       return NextResponse.redirect(new URL("/dashboard", request.url));
//     } else if (userRole === "AUTHOR") {
//       return NextResponse.redirect(new URL("/author-dashboard", request.url));
//     } else if (userRole === "ADMIN") {
//       return NextResponse.redirect(new URL("/admin-dashboard", request.url));
//     } else {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }
//   const isPublicRoute = PUBLIC_ROUTE.some(
//     (route) => pathname === route || pathname.startsWith(route + "/"),
//   );
//   const isAuthRoute = AUTH_ROUTES.some(
//     (route) => pathname === route || pathname.startsWith(route + "/"),
//   );
//   //authenticated pages protection
//   if (!accessToken && !isPublicRoute && !isAuthRoute) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (pathname.startsWith("/dashboard") && userRole !== "USER") {
//     return NextResponse.redirect(new URL("/not-found", request.url));
//   } else if (
//     pathname.startsWith("/author-dashboard") &&
//     userRole !== "AUTHOR"
//   ) {
//     return NextResponse.redirect(new URL("/not-found", request.url));
//   } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
//     return NextResponse.redirect(new URL("/not-found", request.url));
//   }

//   return NextResponse.next();
// }

// // Alternatively, you can use a default export:
// // export default function proxy(request: NextRequest) { ... }

// export const config = {
//   matcher: [
//     // "/dashboard/:path*",
//     // "/author-dashboard/:path*",
//     // "/admin-dashboard/:path*",
//     // "/login",
//     // "/register"
//     "/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)",
//   ],
// };


import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from "./app/utils/jwt";
import { getNewAccessToken } from "./service/refreshToken";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTE = ["/", "/news"];

function redirectWithCookies(
  url: string,
  request: NextRequest,
  response: NextResponse,
) {
  const redirectRes = NextResponse.redirect(new URL(url, request.url));
  response.cookies.getAll().forEach((cookie) => {
    redirectRes.cookies.set(cookie.name, cookie.value, cookie);
  });
  return redirectRes;
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // এই response object-এই সব cookie set/delete হবে, শেষে এটাই বা এর cookie carry করে redirect return হবে
  const response = NextResponse.next();

  // Decode Refresh Token (আলাদা secret দিয়ে)
  const refreshToken = request.cookies.get("refreshToken")?.value || null;
  const decodedRefreshToken = refreshToken
    ? await jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  // Decode Access Token
  let accessToken = request.cookies.get("accessToken")?.value || null;
  let decodedAccessToken = accessToken
    ? await jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string,
      )
    : null;

  // Access token expired but refresh token valid -> নতুন access token নাও
  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken();
    if (result.success) {
      const newAccessToken = result.data.accessToken;
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });
      accessToken = newAccessToken;
      decodedAccessToken = await jwtUtils.verifyToken(
        accessToken as string,
        process.env.JWT_ACCESS_SECRET as string,
      );
    }
  }

  let userRole = null;

  if (!decodedAccessToken?.success) {
    response.cookies.delete("accessToken");
  }

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  // Logged-in অবস্থায় login/register পেজে গেলে role অনুযায়ী redirect
  if (accessToken && decodedAccessToken?.success && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "USER") {
      return redirectWithCookies("/dashboard", request, response);
    } else if (userRole === "AUTHOR") {
      return redirectWithCookies("/author-dashboard", request, response);
    } else if (userRole === "ADMIN") {
      return redirectWithCookies("/admin-dashboard", request, response);
    } else {
      return redirectWithCookies("/", request, response);
    }
  }

  const isPublicRoute = PUBLIC_ROUTE.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // Protected page guard
  if ((!accessToken || !decodedAccessToken?.success) && !isPublicRoute && !isAuthRoute) {
    return redirectWithCookies("/login", request, response);
  }

  // Role-based route guard
  if (pathname.startsWith("/dashboard") && userRole !== "USER") {
    return redirectWithCookies("/not-found", request, response);
  } else if (
    pathname.startsWith("/author-dashboard") &&
    userRole !== "AUTHOR"
  ) {
    return redirectWithCookies("/not-found", request, response);
  } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return redirectWithCookies("/not-found", request, response);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)",
  ],
};
