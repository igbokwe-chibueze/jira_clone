// src/features/projects/components/create-project-modal.tsx
"use client"

import { ResponsiveModal } from "@/components/responsive-modal"
import { useCreateProjectModal } from "../hooks/use-create-project-modal";
import { CreateProjectForm } from "./create-project-form";


export const CreateProjectModal = () => {
    const { isOpen, setIsOpen, close } = useCreateProjectModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}
            title="Create a New Project" // This is only available to screen readers, without this we get an aria warning
            // we can add a description here also which would be visible.
        >
            <CreateProjectForm onCancel={close}/>
        </ResponsiveModal>
    );
};