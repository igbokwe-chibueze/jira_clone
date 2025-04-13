//src/features/auth/api/use-signin.ts

import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.auth.signUp['$post']>;
type RequestType = InferRequestType<typeof client.api.auth.signUp['$post']>;


export const useSignUp = () => {
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.auth.signUp.$post(json);

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        }
    })

    return mutation;
}

