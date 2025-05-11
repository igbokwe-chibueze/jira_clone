// src/features/tasks/components/create-task-modal.tsx
"use client"

import { ResponsiveModal } from "@/components/responsive-modal";

import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { CreateTaskFormWrapper } from "./create-task-form-wrapper";

export const CreateTaskModel = () => {
    //Incase i want to pass a initial status to the task when creating them, coming from the url
    // const { isOpen, setIsOpen, close, initialTaskStatus } = useCreateTaskModal();
    const { isOpen, setIsOpen, close } = useCreateTaskModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateTaskFormWrapper onCancel={close}/>
        </ResponsiveModal>
    )
}