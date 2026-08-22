import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: string;
  email: string;
};

export function proxy(request: NextRequest) {
    console.log("🔥 MIDDLEWARE HIT:", request.nextUrl.pathname);
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("x-user-id", decoded.id);
    // console.log(decoded.id)
    requestHeaders.set("x-user-email", decoded.email);
    // console.log(decoded.email)
//     console.log("MIDDLEWARE PATH:", request.nextUrl.pathname);
// console.log("MIDDLEWARE USER:", decoded);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid or expired token",
      },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    "/api/auth/me",
    "/api/profile/:path*",
    "/api/videos/:path*",
    "/api/conversations/:path*",
    "/dashboard/:path*",
  ],
};



