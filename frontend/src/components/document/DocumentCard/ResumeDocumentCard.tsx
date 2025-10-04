import { useDeleteResume, useResumeAutoUpdate } from '@/api/resume/hooks';
import { useRouter } from 'next/navigation';

import { transformDateTo_DD_MMMM_YYYY_TIME_format } from '@/utils/date/formatDate';

import TitleEditor from '@/components/input/TitleEditor/TitleEditor';
import { DownloadCloud, Ellipsis, Pencil, Trash2 } from 'lucide-react';
import Document from '../Document/Document';
import ActionButton from './ActionButton/ActionButton';

import type { Resume } from '@/types/resume/resume';

import { usePdfDownloader } from '@/api/document/hooks/usePdfDownloader';
import IconButton from "@/components/button/IconButton/IconButton";
import DrawerMenu from "@/components/menu/DrawerMenu/DrawerMenu";
import { useDrawer } from "@/hooks/position/useDrawer";
import { MenuItemData } from "@/types/menu/menu";
import styles from "./DocumentCard.module.scss";

interface ResumeDocumentCardProps {
  data: Resume;
}

export default function ResumeDocumentCard({ data }: ResumeDocumentCardProps) {
  const { updatedAt, title, id } = data;

  const { push } = useRouter();
  const { changeField } = useResumeAutoUpdate(id);
  const { mutate: deleteResume } = useDeleteResume();
  const { downloadPdf } = usePdfDownloader();
  const { id: drawerId, isOpen, open, close } = useDrawer();
  
  const editResume = (id: string) => push(`/resumes/${id}`);

  const actionsData: MenuItemData = [
    {
      type: "control",
      className: styles.actionButtonEdit,
      id: "edit",
      Icon: Pencil,
      title: "Изменить",
      onClick: () => editResume(id),
    },
    {
      type: "control",
      className: styles.actionButtonDownloadPDF,
      id: "download-pdf",
      Icon: DownloadCloud,
      title: "Скачать в PDF",
      onClick: () => downloadPdf("resume", id),
    },
    {
      type: "control",
      className: styles.actionButtonDelete,
      id: "delete",
      Icon: Trash2,
      title: "Удалить",
      onClick: () =>  deleteResume(id),
    },
  ];

  return (
    <>
      <div className={styles.card}>
        <header className={styles.headerMobile}>
          <div className={styles.titleWrapper}>
            <TitleEditor
              className={styles.title}
              value={title}
              onChange={val => changeField("title", val)}
            />

            {updatedAt && (
              <time className={styles.updatedAt} dateTime={updatedAt}>
                Обновлен {transformDateTo_DD_MMMM_YYYY_TIME_format(new Date(updatedAt))}
              </time>
            )}
          </div>

          <IconButton
            className={styles.buttonActionsMenu}
            Icon={Ellipsis}
            iconClassName={styles.buttonActionsMenuIcon}
            onClick={open}
          />
        </header>

        <div className={styles.previewWrapper} role="link" onClick={() => editResume(id)}>
          <Document
            className={styles.preview}
            performance="preview"
            template={{
              data,
              type: "resume",
              template: data.template,
            }}
          />
        </div>
          
        <div className={styles.info}>
          <header className={styles.header}>
            <TitleEditor
              className={styles.title}
              value={title}
              onChange={val => changeField("title", val)}
            />

            {updatedAt && <time className={styles.updatedAt} dateTime={updatedAt}>Обновлен {transformDateTo_DD_MMMM_YYYY_TIME_format(new Date(updatedAt))}</time>}
          </header>

          <div className={styles.actionButtonsList}>
            {actionsData.map((item) => {
              if (item.type === "control") {
                return (
                  <ActionButton
                    key={item.id}
                    className={item.className}
                    Icon={item.Icon}
                    onClick={item.onClick}
                  >
                    {item.title}
                  </ActionButton>
                )
              }
            })}
          </div>
        </div>
      </div>

      <DrawerMenu
        className={styles.mobileActionsMenu}
        id={drawerId}
        isOpen={isOpen}
        title="Действия"
        data={actionsData}
        onClose={close}
      />
    </>
  );
}