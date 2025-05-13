// src/features/tasks/[taskId]/page.tsx

import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { TaskIdClient } from "./client";


const TaskIdPage = async () => {

    // Authentication check
    const user = await getCurrent();
    if (!user) redirect("/sign-in");
        
  return <TaskIdClient/>
}

export default TaskIdPage
