import AllTabPanel from "./AllTabPanel";
import CoverLetterTabPanel from "./CoverLetterTabPanel";
import ResumeTabPanel from "./ResumeTabPanel";

import type { DocumentTabDataMap } from "../types/document";

import styles from "./../DocumentTabs.module.scss";

interface BaseTabPanelProps {
  id: string;
}

export interface AllTabPanelProps extends BaseTabPanelProps {
  type: "all";
  data: DocumentTabDataMap["all"];
}
export interface ResumeTabPanelProps extends BaseTabPanelProps {
  type: "resume";
  data: DocumentTabDataMap["resume"];
}
export interface CoverLetterTabPanelProps extends BaseTabPanelProps {
  type: "coverLetter";
  data: DocumentTabDataMap["coverLetter"];
}

type TabPanelProps = AllTabPanelProps | ResumeTabPanelProps | CoverLetterTabPanelProps;

export default function TabPanel(props: TabPanelProps) {
  const getTabPanel = () => {
    switch(props.type) {
      case "all": return <AllTabPanel {...props} />
      case "resume": return <ResumeTabPanel {...props} />
      case "coverLetter": return <CoverLetterTabPanel {...props} />
    }
  }

  return (
    <div className={styles.panel} role="tabpanel" id={props.id}>
      {getTabPanel()}
    </div>
  );
}