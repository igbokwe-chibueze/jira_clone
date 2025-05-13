// src/features/projects/hooks/use-project-id.ts

import { useParams } from "next/navigation";

 
 export const UseProjectId = () => {
    const params = useParams();
   return params.projectId as string;
 }
 