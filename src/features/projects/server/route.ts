// src/features/projects/server/route.ts

import { z } from "zod";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";

import { DATABASE_ID, IMAGES_BUCKET_ID, PROJECTS_ID } from "@/config";

import { getMember } from "@/features/members/utils";
import { sessionMiddleware } from "@/lib/session-middleware";
import { createProjectSchema } from "../schemas";

const app = new Hono()
    .post(
        "/",
        sessionMiddleware,
        zValidator("form", createProjectSchema),
        async (c) => {
            const databases = c.get("databases")
            const storage = c.get("storage")
            const user = c.get("user")

            const { name, image, workspaceId } = c.req.valid("form");

            const member = await getMember({
                databases,
                workspaceId,
                userId: user.$id,
            })

            if (!member) {
                return c.json({error: "Unauthorized"}, 401)
            }

            let uploadedImageUrl: string | undefined;

            if (image instanceof File) {
                // Upload
                const file = await storage.createFile(
                  IMAGES_BUCKET_ID,
                  ID.unique(),
                  image,
                );
        
                // Fetch raw bytes (ArrayBuffer) directly
                const arrayBuffer: ArrayBuffer = await storage.getFileView(
                  IMAGES_BUCKET_ID,
                  file.$id,
                );
        
                // Base64 encode
                const base64     = Buffer.from(arrayBuffer).toString("base64");
                uploadedImageUrl = `data:${image.type};base64,${base64}`;
            }

            const project = await databases.createDocument(
                DATABASE_ID,
                PROJECTS_ID,
                ID.unique(),
                {
                    name,
                    imageUrl: uploadedImageUrl,
                    workspaceId
                },
            );

            return c.json({ data: project });
        }
    )
    .get(
        "/",
        sessionMiddleware,
        zValidator("query", z.object({ workspaceId: z.string() })),
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");


            const { workspaceId } = c.req.valid("query");

            const member = await getMember({
                databases,
                workspaceId,
                userId: user.$id,
            })

            if (!member) {
                return c.json({error: "Unauthorized"}, 401)
            }

            const projects = await databases.listDocuments(
                DATABASE_ID,
                PROJECTS_ID,
                [
                    Query.equal("workspaceId", workspaceId),
                    Query.orderDesc("$createdAt"),
                ]
            )
            return c.json({ data: projects });
        }
    )

export default app;
