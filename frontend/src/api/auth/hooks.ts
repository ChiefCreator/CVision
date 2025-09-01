import { LoginFormData } from "@/app/auth/login/components/LoginForm/loginSchema";
import { RegisterFormData } from "@/app/auth/register/components/RegisterForm/registerSchema";
import { OAuthProvider } from "@/types/auth/oauthProviders";
import { useMutation, useQuery } from '@tanstack/react-query';
import { authService } from "./authService";
import { authKeys } from "./queryKeys";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (body: RegisterFormData) => authService.register(body),
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (body: LoginFormData) => authService.login(body),
  });
};

export const useConnectByProviderQuery = (provider: OAuthProvider) => {
  return useQuery({
    queryKey: authKeys.connect(provider),
    queryFn: () => authService.connectByProvider(provider),
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: () => authService.logout(),
  });
};