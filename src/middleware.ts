import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    if (user === process.env.NEXT_PUBLIC_BASIC_AUTH_USER &&
      pwd === process.env.NEXT_PUBLIC_BASIC_AUTH_PASS) {
      return NextResponse.next()
    }
  
  }

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
