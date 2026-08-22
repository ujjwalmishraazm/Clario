import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { prisma } from "@/lib/prisma";

export async function GET() {
    interface TokenPayload {
        id: string;
        email: string;
    }
    try {
        const cookie = await cookies();
        const token = cookie.get("token")?.value;
        if (!token) {
            return Response.json(
                { success: false, message: "unable to get token" },
                { status: 401 },
            );
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!,
        ) as TokenPayload;
        const users = decoded?.id;
        const findinguser = await prisma.user.findUnique({
            where: {
                id: users,
            },
        });
        if (!findinguser) {
            return Response.json(
                { success: false, message: "user not verify " },
                { status: 401 },
            );
        }
        return Response.json(
            {
                success: true,
                user: {
                    id: findinguser.id,
                    email: findinguser.email,
                },
            },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                success: false,
                message: "Unauthorized",
            },
            {
                status: 401,
            },
        );
    }
}
