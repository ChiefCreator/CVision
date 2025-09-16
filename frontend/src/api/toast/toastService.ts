import { Slide, toast, ToastOptions } from 'react-toastify';

class ToastService {
  private defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
  };

  constructor(options?: ToastOptions) {
    if (options) {
      this.defaultOptions = { ...this.defaultOptions, ...options };
    }
  }

  custom(content: React.ReactNode, options?: ToastOptions) {
    toast(content, { ...this.defaultOptions, ...options });
  }
}

export const toastService = new ToastService();