// src/features/workspaces/api/use-get-workspace-analytics.ts

import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { InferResponseType } from "hono";

interface useGetWorkspaceAnalyticsProps {
    workspaceId: string;
}

export type WorkspaceAnalyticsResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["analytics"]["$get"], 200>;


export const useGetWorkspaceAnalytics = ({
    workspaceId,
}: useGetWorkspaceAnalyticsProps) => {
    const query = useQuery({
        queryKey: ["Workspace-analytics", workspaceId],
        queryFn: async () => {
            const response = await client.api.workspaces[":workspaceId"]["analytics"].$get({
                param: { workspaceId },
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const {data} = await response.json();

            return data;
        },
    });

    return query;
};

