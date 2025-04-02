import TemplateResume_1 from "./TemplateResume_1/TemplateResume_1";
import templateResume_1_config from "./TemplateResume_1/templateResume_1_config";

import TemplateCoverLetter_1 from "./TemplateCoverLetter_1/TemplateCoverLetter_1";
import templateCoverLetter_1_config from "./TemplateCoverLetter_1/templateCoverLetter_1_config";

const templates = {
  "resume-1": {
    component: TemplateResume_1,
    config: templateResume_1_config,
  },
  "cover-letter-1": {
    component: TemplateCoverLetter_1,
    config: templateCoverLetter_1_config,
  },
};

export default templates;
