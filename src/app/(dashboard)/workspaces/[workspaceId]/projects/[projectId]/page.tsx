// src/app/(dashboard)/workspaces/[workspaceId]/projects/[projectId]/page.tsx

import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/queries"
import { ProjectIdClient } from "./client";


const ProjectIdPage = async () => {
    // Authentication check
    const user = await getCurrent();
    if (!user) redirect("/sign-in");

  return (
    <ProjectIdClient/>
  )
}

export default ProjectIdPage