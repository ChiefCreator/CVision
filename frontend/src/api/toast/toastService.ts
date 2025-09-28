import { Slide, toast, ToastOptions } from 'react-toastify';

class ToastService {
  private defaultOptions: ToastOptions = {
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

  private getResponsiveOptions(): ToastOptions {
    const isMobile = window.innerWidth < 600;
    
    return {
      position: isMobile ? "top-center" : "top-right",
    };
  }

  custom(content: React.ReactNode, options?: ToastOptions) {
    toast(content, { ...this.defaultOptions, ...this.getResponsiveOptions(), ...options });
  }
}

export const toastService = new ToastService();