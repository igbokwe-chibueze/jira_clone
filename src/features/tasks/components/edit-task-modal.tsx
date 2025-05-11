// src/features/tasks/components/edit-task-modal.tsx
"use client"

import { ResponsiveModal } from "@/components/responsive-modal";

import { useEditTaskModal } from "../hooks/use-edit-task-modal";
import { EditTaskFormWrapper } from "./edit-task-form-wrapper";

export const EditTaskModel = () => {
    const { taskId, close } = useEditTaskModal();

    return (
        <ResponsiveModal open={!!taskId} onOpenChange={close}>
            {taskId && (
                <EditTaskFormWrapper id={taskId} onCancel={close}/>
            )}
        </ResponsiveModal>
    )
}