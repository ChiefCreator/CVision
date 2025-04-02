import { db, auth, admin } from "./../../../firebase/firebase-admin.js";
import { sendMail } from "./../../../config/mail.js";
import logger from "../../../logs/log.js";

export class AuthService {

  async sendVerificationCode(email, verificationCode) {
    await this.setVerificationCodeToDatabase(email, verificationCode);
    await this.sendVerificationCodeToEmail(email, verificationCode);

    return { success: true, data: verificationCode };
  };
  async sendVerificationCodeToEmail(email, verificationCode) {
    const mailOptions = {
      to: email,
      subject: "Верификационный код",
      text: `Ваш код: ${verificationCode}`,
    };

    try {
      await sendMail(mailOptions);

      logger.info(`Код подтверждения успешно отправлен на email`);
      return { success: true, data: verificationCode };
    } catch (error) {
      logger.error(`Ошибка отправки кода на email. Ошибка: ${error.message}`);
      throw new Error();
    }
  }
  async setVerificationCodeToDatabase(email, code) {
    const expiresAt = Date.now() + 3 * 60 * 1000;
    const userDoc = db.collection("email_verifications").doc(email);

    try {
      await userDoc.set({ code, expiresAt, createdAt: new Date() });

      logger.info("Верификационный код успешно сохранен в базу данных");
    } catch (error) {
      logger.info(`Ошибка сохранения верификационного кода в базу данных. Ошибка: ${error.message}`);
      throw new Error();
    }
  };

  async verifyUser(email, code) {
    try {
      const response = await this.verifyEmailCode(email, code);

      if (!response.success) throw (response.error);
  
      const user = await auth.getUserByEmail(email);
      const docRef = db.collection("email_verifications").doc(email);
  
      if (!user) {
        await docRef.delete();

        logger.error("Пользователь не был найден в БД");
        throw new Error("Пользователь не найден");
      }
  
      const updatedUser = await auth.updateUser(user.uid, { emailVerified: true });
      await docRef.delete();
  
      logger.info(`Успешная верификация email для: ${email}`);  
      return updatedUser;
    } catch (error) {
      logger.error(`Не удалось подтвердить email для ${email}. Ошибка: ${error.message}`);
      throw error;
    }
  };
  async verifyEmailCode(email, code) {
    try {
      const docRef = db.collection("email_verifications").doc(email);
      const docSnap = await docRef.get();
  
      if (!docSnap.exists) {
        logger.error(`Ошибка верификации: Нет данных для email: ${email}`);
        return { success: false, error: new Error("Ошибка верификацииНет данных кода") };
      }
  
      const { code: savedCode, expiresAt } = docSnap.data();
  
      if (savedCode !== code) {
        logger.error(`Ошибка верификации: Неверный код для email: ${email}. Введенный код: ${code}, сохраненный код: ${savedCode}`);
        return { success: false, error: new Error("Введенный код неверный") };
      }
      if (Date.now() > expiresAt) {
        logger.error("Введенный код недействителен");
        return {  success: false, error: new Error("Код недействителен") };
      }

      return { success: true, data: code };
    } catch {
      return { success: false, error: new Error("Ошибка верификации") };
    }
  };

  async updateUserAuthEmail(userId, newEmail) {
    try {
      const userRecord = await admin.auth().updateUser(userId, { email: newEmail });
      
      return userRecord;
    } catch (error) {
      logger.error(`Ошибка при обновлении email: ${newEmail} у пользователя: ${userId}. Ошибка: ${error.message}`);
      throw new Error("Ошибка при обновлении email");
    }
  }
}
