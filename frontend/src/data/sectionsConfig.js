import PersonalDetailedSection from "../components/CVFormBuilder/PersonalDetailedSection/PersonalDetailedSection";
import ProfessionalSummarySection from "../components/CVFormBuilder/ProfessionalSummarySection/ProfessionalSummarySection";
import EmploymentHistorySection from "../components/CVFormBuilder/EmploymentHistorySection/EmploymentHistorySection";
import CoursesSection from "../components/CVFormBuilder/CoursesSection/CoursesSection";
import SkillsSection from "../components/CVFormBuilder/SkillsSection/SkillsSection";
import LanguagesSection from "../components/CVFormBuilder/LanguagesSection/LanguagesSection";
import ExstraCurricularSection from "../components/CVFormBuilder/ExstraCurricularSection/ExstraCurricularSection";
import HobbiesSection from "../components/CVFormBuilder/HobbiesSection/HobbiesSection";

const sectionsConfig = {
  personalInformation: {
    defaultOrder: 0,
    defaultTitle: "Персональная информация",
    sectionId: "personalInformation",
    Component: PersonalDetailedSection,
  },
  professionalSummary: {
    defaultOrder: 1,
    defaultTitle: "Профессиональное резюме",
    sectionId: "professionalSummary",
    Component: ProfessionalSummarySection,
  },
  employmentHistory: {
    defaultOrder: 2,
    defaultTitle: "Трудовой стаж",
    description: "Покажите свой соответствующий опыт (за последние 10 лет). Отмечайте свои достижения пунктами, по возможности - цифрами /фактами (достиг X, измерил по Y, выполнил Z).",
    SubSectionComponent: EmploymentHistorySection,
    sectionId: "employmentHistory",
    buttonAddTitle: "Добавить занятость",
    subSectionTitleAndSubTitlePattern: {
      title: `{profession} ?employer?в компании?employer? ?employer?"?employer?{employer}?employer?"?employer?`,
      subTitle: `{startDate.month}?startDate.month?.?startDate.month?{startDate.year} ?endDate?-?endDate? {endDate.month}?endDate.year?.?endDate.year?{endDate.year}`,
    },
  },
  courses: {
    defaultOrder: 3,
    defaultTitle: "Курсы",
    description: null,
    SubSectionComponent: CoursesSection,
    sectionId: "courses",
    buttonAddTitle: "Добавить курс",
    subSectionTitleAndSubTitlePattern: {
      title: `{cource}?institute?,?institute? {institute}`,
    },
  },
  skills: {
    defaultOrder: 4,
    defaultTitle: "Навыки",
    description: "Выберите 5 важных навыков, которые показывают, что вы подходите на эту должность. Убедитесь, что они соответствуют ключевым навыкам, указанным в списке вакансий (особенно при подаче заявления через онлайн-систему).",
    SubSectionComponent: SkillsSection,
    sectionId: "skills",
    buttonAddTitle: "Добавить навык",
    subSectionTitleAndSubTitlePattern: {
      title: `{skill}`,
      subTitle: `{parameterId}`,
    },
  },
  languages: {
    defaultOrder: 5,
    defaultTitle: "Языки",
    description: null,
    SubSectionComponent: LanguagesSection,
    sectionId: "languages",
    buttonAddTitle: "Добавить язык",
    subSectionTitleAndSubTitlePattern: {
      title: "{language}",
      subTitle: "{languageLevel}",
    },
  },
  exstraCurricular: {
    defaultOrder: 6,
    defaultTitle: "Внеурочная деятельность",
    description: null,
    SubSectionComponent: ExstraCurricularSection,
    sectionId: "exstraCurricular",
    buttonAddTitle: "Добавить деятельность",
    subSectionTitleAndSubTitlePattern: {
      title: "{language}",
      subTitle: "{languageLevel}",
    },
  },
  hobbies: {
    defaultOrder: 7,
    defaultTitle: "Хобби",
    sectionId: "hobbies",
    Component: HobbiesSection,
  },
};

export default sectionsConfig;