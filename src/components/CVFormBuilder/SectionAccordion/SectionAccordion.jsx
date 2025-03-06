import styles from "./SectionAccordion.module.scss";

import SectionAccordionItem from "./SectionAccordionItem";

import { useResumeContext } from "../../../context/ResumeContext";

import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

function getTitleByPattern(template, data) {
  template = template.replace(/\?([\w\.]+)\?(.*?)\?\1\?/g, (_, key, text) => {
    const keys = key.split(".");
    const value = getValueByKeys(data, keys);

    return value ? text : '';
  });

  function getValueByKeys(obj, keys) {
    let currentValue = obj;
  
    for (const key of keys) {
      if (currentValue && currentValue.hasOwnProperty(key)) {
        currentValue = currentValue[key];
      } else {
        return undefined;
      }
    }
  
    return currentValue;
  }

  function getProperty(obj, path) {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
  }

  return template.replace(/{([^}]+)}/g, (_, path) => {
    return getProperty(data, path) ?? "";
  });
}

export default function SectionAccordion({ openIndex, setOpenIndex, draggingIndex, setDraggingIndex, ContentComponent, contentComponentsData, resumeId, sectionId, isResumeDataLoaded, titleAndSubTitlePattern }) {
  const { dispatchOfResumesDataState } = useResumeContext();

  function handleDragStart(event) {
    const accordionItem = document.getElementById(event.active.id);

    if (accordionItem.dataset.isOpen == "true") {
      setOpenIndex({ ...openIndex, current: null });
    }

    setDraggingIndex(+accordionItem.dataset.index);
  }
  function handleDragEnd(event) {
    const { active, over } = event;

    setOpenIndex({ ...openIndex, current: openIndex.beforeDragStart });
    setDraggingIndex(null);

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = contentComponentsData.findIndex((item) => item.id === active.id);
      const newIndex = contentComponentsData.findIndex((item) => item.id === over.id);
      const newContentComponentsData = arrayMove(contentComponentsData, oldIndex, newIndex);

      if (openIndex.beforeDragStart !== null) {
        setOpenIndex({ ...openIndex, current: newIndex });
      }

      dispatchOfResumesDataState({
        type: "UPDATE_RESUME_SUB_SECTION_ORDER",
        resumeId: resumeId,
        sectionId: sectionId,
        data: newContentComponentsData,
      });
    }
  }

  function toggle(index) {
    setOpenIndex(openIndex.current === index ? { current: null, beforeDragStart: null } : { current: index, beforeDragStart: index });
  }
  function deleteByIndex(index) {
    dispatchOfResumesDataState({
      type: "DELETE_RESUME_SUB_SECTION",
      resumeId: resumeId,
      sectionId: sectionId,
      order: index,
    });
  }

  return (
    <div className={styles.accordion}>
      <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <SortableContext items={contentComponentsData} strategy={verticalListSortingStrategy}>
          {contentComponentsData.map((data, index) => {
            const title = getTitleByPattern(titleAndSubTitlePattern.title, data).trim() || "Не указано";
            const subTitle = titleAndSubTitlePattern.subTitle && getTitleByPattern(titleAndSubTitlePattern.subTitle, data);

            return (
              <SectionAccordionItem title={title} subTitle={subTitle} key={data.id} id={data.id} isOpen={openIndex.current === index} isDragging={draggingIndex === index} index={index} onClickCallback={() => toggle(index)} onClickButtonDeleteCallback={() => deleteByIndex(index)}>
                <ContentComponent data={data} resumeId={resumeId} isResumeDataLoaded={isResumeDataLoaded} />
              </SectionAccordionItem>
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
}
