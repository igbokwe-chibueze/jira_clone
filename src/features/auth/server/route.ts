//src/features/auth/server/route.ts

import { Hono } from 'hono';
import {zValidator} from "@hono/zod-validator";
import { signInSchema, signUpSchema } from '../schemas';
import { createAdminClient } from '@/lib/appwrite';
import { deleteCookie, setCookie } from 'hono/cookie';
import { AUTH_COOKIE } from '../constant';
import { ID } from 'node-appwrite';


const app = new Hono()
    .post(
        "/signIn",
        zValidator("json", signInSchema),
        async(c) => {
            const { email, password } = c.req.valid("json");
            
            const { account } = await createAdminClient();
            const session = await account.createEmailPasswordSession(email, password);

            setCookie(c, AUTH_COOKIE, session.secret, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30,
            })

            return c.json({success: true});
        }
    )
    .post(
        "/signUp",
        zValidator("json", signUpSchema),
        async (c) => {
            const { name, email, password } = c.req.valid("json");

            const { account } = await createAdminClient();
            await account.create(
                ID.unique(),
                email,
                password,
                name
            );

            const session = await account.createEmailPasswordSession(email, password);

            setCookie(c, AUTH_COOKIE, session.secret, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30,
            })

            return c.json({success: true});
        }
    )
    .post(
        "/signOut",
        (c) => {
            deleteCookie(c, AUTH_COOKIE);

            return c.json({success: true});
        }
    )

export default app;
