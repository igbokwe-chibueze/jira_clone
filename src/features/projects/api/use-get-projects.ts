// src/features/projects/api/use-get-projects.ts

import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface UseGetProjectsProps {
    workspaceId: string;
}

export const useGetProjects = ({
    workspaceId,
}: UseGetProjectsProps) => {
    const query = useQuery({
        queryKey: ["projects", workspaceId],
        queryFn: async () => {
            const response = await client.api.projects.$get({
                query: { workspaceId },
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

