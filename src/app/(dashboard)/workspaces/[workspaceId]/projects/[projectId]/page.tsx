// src/app/(dashboard)/workspaces/[workspaceId]/projects/[projectId]/page.tsx

import { redirect } from "next/navigation"
import { getCurrent } from "@/features/auth/queries"
import { getProject } from "@/features/projects/queries";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

interface ProjectIdPageProps {
    // `params` is now a Promise that resolves to both dynamic segments
    params: Promise<{
      workspaceId: string;
      projectId: string;
    }>;
  }

const ProjectIdPage = async ({
    params
}: ProjectIdPageProps) => {

    // Await the Promise to get your actual route parameters
    const { projectId } = await params;

    // Authentication check
    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    // Fetch the project data
    const initialValues = await getProject({ projectId });
    if (!initialValues) throw new Error("Project not found");

  return (
    <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
                <ProjectAvatar 
                    name={initialValues.name}
                    image={initialValues.imageUrl}
                    className="size-8"
                />

                <p className="text-lg font-semibold">{initialValues.name}</p>
            </div>
            <div>
                <Button variant="secondary" size="sm" asChild>
                    <Link href={`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}/settings`}>
                        <PencilIcon className="size-4 mr-2"/>
                        Edit Project
                    </Link>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default ProjectIdPage