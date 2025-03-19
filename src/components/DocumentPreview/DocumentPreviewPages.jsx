import styles from "./DocumentPreview.module.scss";

export default function DocumentPreviewPages({ pages, currentPageIndex, TemplateComponent, lineSpacing }) {
  return (
    <div className={styles.pages}>
      {pages.map((page, pageIndex) => (
        <TemplateComponent
          key={pageIndex}

          isHiden={currentPageIndex !== pageIndex}
          isHeader={page.isHeader}

          headerSections={page.headerSections}
          asideSections={page.asideSections}
          mainSections={page.mainSections}

          lineSpacing={lineSpacing}
        />
      ))}
    </div>
  );
}