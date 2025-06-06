//src/features/auth/api/use-signin.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.signUp['$post']>;
type RequestType = InferRequestType<typeof client.api.auth.signUp['$post']>;


export const useSignUp = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

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
        },
        onSuccess: () => {
            toast.success("Signed up");
            router.refresh();
            queryClient.invalidateQueries({queryKey: ["current"]});
        },
        onError: () => {
            toast.error("Failed to sign up");
        }
    })

    return mutation;
}

