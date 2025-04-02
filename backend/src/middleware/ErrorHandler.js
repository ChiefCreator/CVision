export const errorHandler = (err, req, res, next) => {
  console.error("Ошибка:", err.message);
  res.status(400).json({ success: false, message: err.message || "Неизвестная ошибка" });
};
