// src/app/(standalone)/workspaces/[workspaceId]/settings/client.tsx
"use client"

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { EditWorkSpaceForm } from "@/features/workspaces/components/edit-workspace-form"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const WorkspaceIdSettingsClient = () =>  {
    const workspaceId = useWorkspaceId();
    const { data: initialValues, isLoading } = useGetWorkspace({ workspaceId });

    if (isLoading) {
        return <PageLoader/>
    }

    if (!initialValues) {
        return <PageError message="workspace not found"/>
    }

    return (
        <div className="w-full lg:max-w-xl">
            <EditWorkSpaceForm initialValues={initialValues}/>
        </div>
    )
}