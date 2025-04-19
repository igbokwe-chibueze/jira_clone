import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono"
import { createWorkspaceSchema } from "../schemas";
import { ID } from "node-appwrite";
import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from "@/config";

const app = new Hono()
    .post(
        "/", // this is /workspaces
        zValidator("form", createWorkspaceSchema),
        sessionMiddleware,
        async (c) => {
            const databases = c.get("databases")
            const storage = c.get("storage")
            const user = c.get("user")

            const { name, image } = c.req.valid("form");

            let uploadedImageUrl: string | undefined;

            // if (image instanceof File) {
            //     const file = await storage.createFile(
            //         IMAGES_BUCKET_ID,
            //         ID.unique(),
            //         image,
            //     );

            //     const arrayBuffer = await storage.getFilePreview(
            //         IMAGES_BUCKET_ID,
            //         file.$id,
            //     );

            //     uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
                
            // }

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

            const workspace = await databases.createDocument(
                DATABASE_ID,
                WORKSPACES_ID,
                ID.unique(),
                {
                    name,
                    userId: user.$id,
                    imageUrl: uploadedImageUrl,
                },
            );

            return c.json({ data: workspace });
        }
    )

export default app;