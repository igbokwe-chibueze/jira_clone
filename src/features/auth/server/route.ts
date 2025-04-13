//src/features/auth/server/route.ts

import { Hono } from 'hono';
import {zValidator} from "@hono/zod-validator";
import { signInSchema, signUpSchema } from '../schemas';


const app = new Hono()
    .post(
        "/signIn",
        zValidator("json", signInSchema),
        (c) => {
            const { email, password } = c.req.valid("json");
            console.log(email, password);
            return c.json(c.req.valid("json"));
        }
    )
    .post(
        "/signUp",
        zValidator("json", signUpSchema),
        (c) => {
            const { name, email, password } = c.req.valid("json");
            console.log(name, email, password);
            return c.json(c.req.valid("json"));
        }
    );
    


export default app;
