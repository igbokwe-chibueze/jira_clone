// src/features/tasks/schemas.ts

import { z } from "zod";
import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  status: z.nativeEnum(TaskStatus, {
    required_error: "Status is required",
  }),
  workspaceId: z.string().trim().min(1, "Workspace is required"),
  projectId: z.string().trim().min(1, "Project is required"),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, "Assignee is required"),
  description: z.string().optional(),
});

export const editTaskSchema = createTaskSchema
  .omit({ workspaceId: true, description: true })
  .extend({
    // if you want to add any edit‐specific refinements, do it here
});