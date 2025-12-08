import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Redirect root "/" to "/d/dashboard"
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/d/dashboard", request.url));
  }

  // Continue processing for other routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // only runs on "/"
};
