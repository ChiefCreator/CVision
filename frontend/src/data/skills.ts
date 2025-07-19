import { SkillLevel } from "@/types/sectionTypes/sections";

interface Skill {
  value: SkillLevel;
  label: string;
}

export const skills: Skill[] = [
  {
    value: SkillLevel.Novice,
    label: "Новичок"
  },
  {
    value: SkillLevel.Beginner,
    label: "Начинающий"
  },
  {
    value: SkillLevel.Skillful,
    label: "Умелый"
  },
  {
    value: SkillLevel.Experienced,
    label: "Опытный"
  },
  {
    value: SkillLevel.Expert,
    label: "Эксперт"
  }
];