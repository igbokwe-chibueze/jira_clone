// src/app/(standalone)/workspaces/[workspaceId]/projects/[projectId]/settings/ProjectIdSettingPage.tsx

import { getCurrent } from "@/features/auth/queries";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";

interface ProjectIdSettingPageProps {
    // `params` is now a Promise that resolves to both dynamic segments
    params: Promise<{ projectId: string }>;
}

const ProjectIdSettingPage = async ({params}: ProjectIdSettingPageProps) => {
    // Unwrap the params promise
    const { projectId } = await params;

    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    const initialValues = await getProject({ projectId });

  return (
    <div className="w-full lg:max-w-xl">
        ProjectIdSettingPage
        <EditProjectForm initialValues={initialValues}/>
    </div>
  )
}

export default ProjectIdSettingPage