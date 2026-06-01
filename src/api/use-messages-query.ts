import { useQuery } from "@tanstack/react-query";
import { api } from "./api";

export const MessagesQueryKey = "messagesQueryKey";

export const useMessagesQuery = (chatId: number) => {

  return useQuery({
    queryKey: [MessagesQueryKey, chatId],
    queryFn: () => api<string>(`/api/chats/messages/${chatId}`),
    enabled: false
  });

};
