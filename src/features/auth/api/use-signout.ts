//src/features/auth/api/use-signin.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.signOut['$post']>;


export const useSignOut = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api.auth.signOut.$post();

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("Signed out");
            router.refresh();
            queryClient.invalidateQueries({queryKey: ["current"]});
            queryClient.invalidateQueries({queryKey: ["workspaces"]});
        },
        onError: () => {
            toast.error("Failed to sign out");
        }
    })

    return mutation;
}

