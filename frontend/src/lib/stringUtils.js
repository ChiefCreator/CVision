export function replaceSpaces(text, replacement = "_") {
  return text.split(" ").join(replacement);
}

export function cleanHTMLString(html) {
  return html
      .replace(/<[^>]*>/g, '')  // Удаляет HTML-теги
      .replace(/&nbsp;/g, ' ')  // Убирает неразрывные пробелы
      .replace(/&amp;/g, '&')   // Декодирует амперсанд
      .replace(/\s+/g, ' ')     // Убирает лишние пробелы
      .trim();                  // Удаляет пробелы по краям
}