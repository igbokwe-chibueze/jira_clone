// src/features/tasks/api/use-update-task.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]['$patch'], 200>;
type RequestType = InferRequestType<typeof client.api.tasks[":taskId"]['$patch']>;


export const useUpdateTask = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({json, param}) => {
            const response = await client.api.tasks[":taskId"].$patch({json, param});

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("Task updated");

            router.refresh();
            queryClient.invalidateQueries({queryKey: ["tasks"]});
            queryClient.invalidateQueries({queryKey: ["tasks", data.$id]});
        },
        onError: () => {
            toast.error("Failed to update task");
        }
    })

    return mutation;
}

