// src/app/(standalone)/workspaces/[workspaceId]/settings/page.tsx

import { getCurrent } from "@/features/auth/queries";
import { getWorkspace } from "@/features/workspaces/queries";
import { EditWorkSpaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { redirect } from "next/navigation";

interface WorkspaceIdSettingsPageProps {
    // params: {
    //     workspaceId: string;
    // }
    params: Promise<{ workspaceId: string }>;
}

const WorkspaceIdSettingsPage = async ({
    params,
}: WorkspaceIdSettingsPageProps) => {
    const { workspaceId } = await params;

    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    //const initialValues = await getWorkspace({ workspaceId: params.workspaceId});
    const initialValues = await getWorkspace({ workspaceId });

    return (
        <div className="w-full lg:max-w-xl">
            <EditWorkSpaceForm initialValues={initialValues}/>
        </div>
    )
}

export default WorkspaceIdSettingsPage;