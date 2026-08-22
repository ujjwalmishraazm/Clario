import {  SignupSchema } from "@/lib/zod/signup";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

  export async function POST(request:Request) {
    try {
        const data = await request.json();
        const validate = SignupSchema.safeParse(data)
        if (!validate.success) {
            console.log(validate.success)
            return Response.json({sucess: false, errors: validate.error.flatten().fieldErrors},{status:400})
        }
        const {  email, passwordHash } = validate.data

        const validateusername = await prisma.user.findUnique({
            where:{
              email
            }
        })
        if (validateusername) {
            return Response.json({sucess:false,message:"username already taken"},{status:400})
        }
        const validateEmail = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if (validateEmail) {
            return Response.json({success:false,message:'email already taken'},{status:400})
        }
        const hashedpassword = await bcrypt.hash(passwordHash,10)

        const createduser = await prisma.user.create({
          data:{
           
            email,
            passwordHash:hashedpassword
          }
        })
        
        return Response.json({success:true,message:createduser},{status:200})

        
    } catch (error) {
        console.error(error,'error')
        return Response.json(
            {
                success: false,
                message: "error during registration",
            },
            {
                status: 500,
            },
        );
    }
}
