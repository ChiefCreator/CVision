// "use client"

// import { DocumentPageProvider } from "@/hooks/document/useDocumentPage";
// import { ResumeIdProvider } from "@/hooks/resume/useResumeId";

// import ResumeEditorForm from "../ResumeEditorForm/ResumeEditorForm";
// import ResumePreview from "../ResumePreview/ResumePreview";

// import { AbsoluteSidebarProvider } from "@/hooks/menu/useAbsoluteSidebarContext";
// import { ResumeProvider } from "@/hooks/resume/useResume";
// import { BaseComponent } from "@/types/root";
// import clsx from "clsx";
// import ResumeMobileTabs from "../ResumeMobileTabs/ResumeMobileTabs";
// import styles from "./ResumeEditor.module.scss";

// interface ResumeEditorProps extends BaseComponent {
//   resumeId: string;
// }

// export default function ResumeEditor({ className, resumeId }: ResumeEditorProps) {
//   return (
//     <AbsoluteSidebarProvider>
//       <ResumeIdProvider id={resumeId}>
//         <ResumeProvider>
//           <DocumentPageProvider>
//             <div className={clsx(styles.editor, className)}>
//               <div className={styles.container}>
//                 <ResumeMobileTabs className={styles.tabs} />

//                 <ResumeEditorForm className={styles.form} />

//                 <ResumePreview className={styles.preview} />
//               </div>
//             </div>
//           </DocumentPageProvider>
//         </ResumeProvider>
//       </ResumeIdProvider>
//     </AbsoluteSidebarProvider>
//   );
// }