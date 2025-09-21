import { LoginFormData } from "@/app/auth/login/components/LoginForm/loginSchema";
import { RegisterFormData } from "@/app/auth/register/components/RegisterForm/registerSchema";
import { OAuthProvider } from "@/types/auth/oauthProviders";
import { toastMessageHandler } from "@/utils/toast/toastResponseHandler";
import { useMutation } from '@tanstack/react-query';
import { useRouter } from "next/navigation";
import { authService } from "./authService";

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

export const useConnectByProviderMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (provider: OAuthProvider) => authService.connectByProvider(provider),
    onSuccess({ url }) {
      router.push(url);
    },
    onError(error) {
      toastMessageHandler(error);
    }
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

export const useChangeEmailMutation = () => {
  return useMutation({
    mutationFn: (token: string | null) => authService.changeEmail(token),
    onSuccess() {
      toastMessageHandler({ message: "Вы изменили почту" });
    },
    onError(error) {
      toastMessageHandler(error);
    }
  });
};