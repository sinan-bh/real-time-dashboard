import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/d") {
    return NextResponse.redirect(new URL("/d/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/d"], 
};
