import { LanguageLevel } from "@/types/resumeTypes";

interface Language {
  value: LanguageLevel;
  label: string;
}

export const languages: Language[] = [
  {
    value: LanguageLevel.NativeSpeaker,
    label: "Носитель языка",
  },
  {
    value: LanguageLevel.HighlyProficient,
    label: "Свободное владение",
  },
  {
    value: LanguageLevel.GoodWorkingKnowledge,
    label: "Хорошее рабочее знание",
  },
  {
    value: LanguageLevel.WorkingKnowledge,
    label: "Рабочее знание",
  },
  {
    value: LanguageLevel.A1,
    label: "A1 (Начальный)",
  },
  {
    value: LanguageLevel.A2,
    label: "A2 (Элементарный)",
  },
  {
    value: LanguageLevel.B1,
    label: "B1 (Средний)",
  },
  {
    value: LanguageLevel.B2,
    label: "B2 (Выше среднего)",
  },
  {
    value: LanguageLevel.C1,
    label: "C1 (Продвинутый)",
  },
  {
    value: LanguageLevel.C2,
    label: "C2 (Профессиональный уровень)",
  },
];