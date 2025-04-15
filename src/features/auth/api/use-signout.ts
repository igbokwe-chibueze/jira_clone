//src/features/auth/api/use-signin.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.auth.signOut['$post']>;
//type RequestType = InferRequestType<typeof client.api.auth.signOut['$post']>;


export const useSignOut = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation<
        ResponseType,
        Error
        //RequestType
    >({
        mutationFn: async () => {
            const response = await client.api.auth.signOut.$post();

            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["current"]});
        }
    })

    return mutation;
}

