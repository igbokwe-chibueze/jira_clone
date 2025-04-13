//src/features/auth/schemas.ts
import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1).max(256),
})

export const signUpSchema = z.object({
    name: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(6).max(256),
})