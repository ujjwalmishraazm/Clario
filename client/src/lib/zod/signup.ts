import * as z from "zod";

 export const SignupSchema = z
  .object({
      // username:z.string().min(8).lowercase(),
      email:z.email(),
     passwordHash: z.string().min(8),
   
  })


export const signInSchema = z.object({
  identifier: z.string(),
  passwordHash: z.string(),
});