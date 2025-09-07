"use client"

import { toastMessageHandler } from "@/utils/toast/toastResponseHandler";
import { useMutation } from '@tanstack/react-query';
import { verificationService } from "./verificationService";

export const useConfirmEmailMutation = () => {
  return useMutation({
    mutationFn: (token: string | null) => verificationService.confirmEmail(token),
    onSuccess() {
      toastMessageHandler({ message: "Почта успешно подтверждена" });
    },
    onError(error) {
      toastMessageHandler(error);
    }
  });
};