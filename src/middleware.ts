import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth");

  // Step 1: If already authenticated, skip auth
  if (authCookie?.value === "1") {
    return NextResponse.next();
  }

  const basicAuth = request.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    if (
      user === process.env.NEXT_PUBLIC_BASIC_AUTH_USER &&
      pwd === process.env.NEXT_PUBLIC_BASIC_AUTH_PASS
    ) {
      const res = NextResponse.next();
      res.cookies.set("auth", "1", {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });
      return res;
    }
  }

  // Step 3: Not authenticated
  return new Response("Auth required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: "/:path*",
};
