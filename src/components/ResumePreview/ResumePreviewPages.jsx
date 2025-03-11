import styles from "./ResumePreview.module.scss";

export default function ResumePreviewPages({ pages, currentPageIndex, ref, TemplateComponent, mainSections, resumeData }) {
  return (
    <div className={styles.pages} ref={ref}>
      {pages.map((page, pageIndex) => (
        <TemplateComponent
          isHiden={currentPageIndex !== pageIndex}
          key={pageIndex}
          isHeader={page.header}
          asideSections={page.asideSections}
          mainSections={mainSections}
          resumeData={resumeData}
        />
      ))}
    </div>
  );
}