import { prisma } from "@/lib/prisma";
import { signInSchema } from "@/lib/zod/signup";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const data = await request.json();
        const validateData = signInSchema.safeParse(data);
        if (!validateData.success) {
            return Response.json(
                { success: false, message: "unable to parse ur inputs" },
                { status: 400 },
            );
        }
        const { identifier, passwordHash } = validateData.data;
        console.log(identifier, passwordHash);
        const user = await prisma.user.findFirst({
            where: {
                 email: identifier 
            },
        });
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "Invalid credentials",
                },
                { status: 401 },
            );
        }
        const comparepassword = await bcrypt.compare(passwordHash, user.passwordHash);
        console.log(comparepassword);
        if (!comparepassword) {
            return Response.json(
                {
                    success: false,
                    message: "Invalid password",
                },
                { status: 401 },
            );
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "7d",
            },
        );

        const res = NextResponse.json({
            success: true,
            message: "login succesfully",
        });
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, 
        });
        return res
        
    } catch (error) {
        console.error(error);
        return Response.json(
            { success: false, message: "unable to login" },
            { status: 500 },
        );
    }
}
