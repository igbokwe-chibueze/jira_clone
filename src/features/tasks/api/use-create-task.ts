// src/features/tasks/api/use-create-task.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.tasks['$post'], 200>;
type RequestType = InferRequestType<typeof client.api.tasks['$post']>;


export const useCreateTask = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.tasks.$post(json);

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("Task created");

            queryClient.invalidateQueries({queryKey: ["product-analytics"]});
            queryClient.invalidateQueries({queryKey: ["workspace-analytics"]});
            queryClient.invalidateQueries({queryKey: ["tasks"]});
        },
        onError: () => {
            toast.error("Failed to create task");
        }
    })

    return mutation;
}

