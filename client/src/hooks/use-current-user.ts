"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type CurrentUser = {
  id: string;
  email: string;
};

type CurrentUserResponse = {
  success: boolean;
  user?: CurrentUser;
  message?: string;
};

async function getCurrentUser(): Promise<CurrentUser> {
  const response =
    await axios.get<CurrentUserResponse>("/api/auth/me");

  if (!response.data.success || !response.data.user) {
    throw new Error(
      response.data.message ?? "Failed to fetch current user",
    );
  }

  return response.data.user;
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}