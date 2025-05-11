// src/features/tasks/hooks/use-create-task-modal.ts
import { useQueryState, parseAsBoolean } from "nuqs";

export const useCreateTaskModal = () => {
    const [isOpen, setIsOpen] = useQueryState(
        "create-task",
        parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
    )

    //Incase i want to have an initial status for a task once i open this model
    //const open = (initialStatus: TaskStatus) => setIsOpen(true)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    return {
        isOpen,
        open,
        close,
        setIsOpen
    }
}