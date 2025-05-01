// src/features/workspaces/hooks/use-invite-code.ts
import { useParams } from "next/navigation";

export const useInviteCode = () => {
  const params = useParams();
  return params.inviteCode as string;
};
