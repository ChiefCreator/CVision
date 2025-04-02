import { AuthService } from "./auth.service.js";

import { generateCode } from "./../../lib/mathUtils.js";

const authService = new AuthService();

export class AuthController {

  async sendVerificationCode(req, res, next) {
    const { email } = req.body;
  
    if (!email) {
      throw new Error("Email не указан");
    }
  
    try {
      const verificationCode = generateCode();
      const response = await authService.sendVerificationCode(email, verificationCode);
  
      res.status(200).json(response);
    } catch (error) {
      next(new Error("Не удалось отправить письмо для верификации email. Попробуйте позже."));
    }
  }

  async verifyEmailCode(req, res, next) {
    const { email, code } = req.body;
  
    if (!email || !code) {
      throw new Error("Email и код обязательны");
    }

    try {
      const response = await authService.verifyEmailCode(email, code);
      console.log(response)

      if (!response.success) {
        return next(new Error("Не удалось подтвердить email. Попробуйте позже."));
      }

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
   
  async verifyUser(req, res, next) {
    const { email, code } = req.body;
  
    if (!email || !code) {
      throw new Error("Email и код обязательны");
    }
  
    try {
      const updatedUser = await authService.verifyUser(email, code);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(new Error("Не удалось подтвердить пользователя. Попробуйте позже."));
    }
  }

  async updateUserAuthEmail(req, res, next) {
    const { userId, newEmail } = req.body;

    try {
      const updatedUser = await authService.updateUserAuthEmail(userId, newEmail);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
}
