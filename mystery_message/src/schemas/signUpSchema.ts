import { z } from 'zod'

export const usernameValidation = z
    .string()
    .min(2,"Username must be atleast 2 character")
    .max(20,"Username must not grater then 20 character")
    

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:'Invalid email address'}),
    password: z.string().min(6,{message:"Mininum 6 character are required"})
    

})
