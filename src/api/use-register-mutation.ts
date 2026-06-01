import { useMutation } from "@tanstack/react-query";
import { post } from "./api";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (input: string) =>
      post<string, string>("/api/auth/register", input),
  });
};
