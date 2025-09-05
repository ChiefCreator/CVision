import { LoginFormData } from "@/app/auth/login/components/LoginForm/loginSchema";
import { RegisterFormData } from "@/app/auth/register/components/RegisterForm/registerSchema";
import { OAuthProvider } from "@/types/auth/oauthProviders";
import { toastMessageHandler } from "@/utils/toast/toastResponseHandler";
import { useMutation, useQuery } from '@tanstack/react-query';
import { authService } from "./authService";
import { authKeys } from "./queryKeys";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (body: RegisterFormData) => authService.register(body),
    onSuccess(data: any) {
      toastMessageHandler(data);
    },
    onError(error) {
      toastMessageHandler(error);
    }
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (body: LoginFormData) => authService.login(body),
    onSuccess() {
      toastMessageHandler({ message: "Успешный вход в аккаунт" });
    },
    onError(error) {
      toastMessageHandler(error);
    }
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
    onSuccess() {
      toastMessageHandler({ message: "Вы вышли из аккаунта" });
    },
    onError(error) {
      toastMessageHandler(error);
    }
  });
};