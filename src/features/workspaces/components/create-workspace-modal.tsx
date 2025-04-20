//src/features/workspaces/components/create-workspace-modal.tsx
"use client"

import { ResponsiveModal } from "@/components/responsive-modal"
import { CreateWorkSpaceForm } from "@/features/workspaces/components/create-workspace-form"
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal"


export const CreateWorkSpaceModal = () => {
    const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}
            title="Create a New Workspace" // This is only available to screen readers, without this we get an aria warning
            // we can add a description here also which would be visible.
        >
            <CreateWorkSpaceForm onCancel={close}/>
        </ResponsiveModal>
    );
};