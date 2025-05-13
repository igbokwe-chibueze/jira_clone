// src/features/tasks/[taskId]/client.tsx
"use client"

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetTask } from "../../../../../../features/tasks/api/use-get-task";
import { UseTaskId } from "../../../../../../features/tasks/hooks/use-taskId";
import { TaskBreadCrumbs } from "@/features/tasks/components/task-breadcrumbs";
import DottedSeparator from "@/components/dotted-separator";
import { TaskOverview } from "@/features/tasks/components/task-overview";
import { TaskDescription } from "@/features/tasks/components/task-description";


export const TaskIdClient = () => {
    const taskId = UseTaskId();
    const { data, isLoading } = useGetTask({ taskId });

    if (isLoading) {
        return <PageLoader />;
    }

    if (!data) {
        return <PageError message="Task not found"/>;
    }

    return (
        <div>
            <TaskBreadCrumbs project={data.project} task={data}/>
            <DottedSeparator className="my-6"/>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TaskOverview task={data}/>
                <TaskDescription task={data}/>
            </div>
        </div>
    )
}