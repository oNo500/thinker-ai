import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/query-client';

import type { ApiResponse, ApiError, User } from '@/types/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest): Promise<User> => {
      const response = await apiClient.post<User>('/api/auth/login', data);
      return response;
    },
    onSuccess: (data) => {
    },
    onError: (error: ApiError) => {
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterRequest): Promise<User> => {
      const response = await apiClient.post<ApiResponse<User>>('/api/auth/register', data);
      return response.data;
    },
    onSuccess: () => {
    },
    onError: (error: ApiError) => {
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      await apiClient.post('/api/auth/logout');
    },
    onSuccess: () => {
    },
    onSettled: () => {
      queryClient.clear();
    },
  });
};
