import { apiClient } from "./client";

export type LoginInput = {
  email: string;
  password: string;
};

export type SignupInput = {
  email: string;
  password: string;
};

export type AuthResponse = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function login(
  data: LoginInput,
): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(
    "/api/auth/logIn",
    {
      identifier: data.email,
      passwordHash: data.password,
    },
  );

  return response.data;
}

export async function signup(
  data: SignupInput,
): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(
    "/api/auth/signup",
    {
      email: data.email,
      passwordHash: data.password,
    },
  );

  return response.data;
}