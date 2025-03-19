import styles from "./TemplateCoverLetter_1.module.scss";

import { useEffect } from "react";

function SectionLetterDetails({ data, ref }) {
  if (!data.description || data.description === "<br>") return null;

  return (
    <section className={`${styles.mainSection} ${styles.sectionDetails}`} id={data.id} ref={ref}>
      <p className={styles.mainSectionDescription} dangerouslySetInnerHTML={{ __html: data.description }}></p>
    </section>
  );
}
function SectionTo({ data, ref }) {
  return (
    <section className={`${styles.asideSection}`} id={data.id} key={data.id} ref={ref}>
      <span className={styles.asideSectionTitle}>Получатель</span>
      <span className={styles.asideSectionValue}>{data?.companyName}</span>
      <span className={styles.asideSectionValue}>{data?.hiringManagerName}</span>
    </section>
  );
}
function SectionFrom({ data, ref }) {
  return (
    <section className={`${styles.asideSection}`} id={data.id} key={data.id} ref={ref}>
      <span className={styles.asideSectionTitle}>Отправитель</span>
      <span className={styles.asideSectionValue}>{data?.fullName}</span>
      <span className={styles.asideSectionValue}>{data?.job}</span>
      <span className={styles.asideSectionValue}>{data?.adress}</span>
      <span className={styles.asideSectionValue}>{data?.phoneNumber}</span>
      <span className={styles.asideSectionValue}>{data?.email}</span>
    </section>
  );
}

export default function TemplateCoverLetter_1({ isHeader, headerSections, asideSections, mainSections, lineSpacing = 100, asideSectionsRefs, mainSectionsRefs, blocksOverSectionsRefs, isHiden, onRender }) {
  const personalDetails = headerSections?.find((section) => section.id === "personalDetails");

  useEffect(() => {
    onRender && onRender();
  }, []);

  return (
    <article className={`${styles.template} ${isHiden ? styles.templateHidden : ""}`} style={{ lineHeight: lineSpacing + "%" }}>
        <div className={styles.templateContainer}>
          <div className={styles.templateContent}>
            {isHeader && 
              <header className={styles.templateHeader} ref={blocksOverSectionsRefs ? (el) => (blocksOverSectionsRefs.current.header = el) : null}>
                <h2 className={styles.templateFullName}>{personalDetails?.fullName}</h2>
                <span className={styles.templateJob}>{personalDetails?.job}</span>
              </header>} 
          
            <div className={styles.templateBody}>
              <div className={styles.templateMainContent}>
                <div className={styles.templateMainSections}>
                  {mainSections?.map(data => {
                    switch (data.id) {
                      case "letterDetails":
                        return <SectionLetterDetails data={data} key={data.id} ref={mainSectionsRefs ? (el) => (mainSectionsRefs.current[data.id] = el) : null} />
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
              <div className={styles.templateAside}>
                <div className={styles.templateAsideSections}>  
                  {asideSections?.map(data => {
                    switch (data.id) {
                      case "sectionTo":
                        return <SectionTo data={data} key={data.id} ref={asideSectionsRefs ? (el) => (asideSectionsRefs.current[data.id] = el) : null} />
                      case "sectionFrom":
                        return <SectionFrom data={data} key={data.id} ref={asideSectionsRefs ? (el) => (asideSectionsRefs.current[data.id] = el) : null} />
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
    </article>
  );
}
