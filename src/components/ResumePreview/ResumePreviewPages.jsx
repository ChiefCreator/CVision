import styles from "./ResumePreview.module.scss";

export default function ResumePreviewPages({ pages, currentPageIndex, TemplateComponent, resumeData }) {
  return (
    <div className={styles.pages}>
      {pages.map((page, pageIndex) => (
        <TemplateComponent
          isHiden={currentPageIndex !== pageIndex}
          key={pageIndex}
          isHeader={page.isHeader}
          asideSections={page.asideSections}
          mainSections={page.mainSections}
          resumeData={resumeData}
        />
      ))}
    </div>
  );
}