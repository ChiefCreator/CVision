import { useDrawer } from "@/hooks/position/useDrawer";

import { MenuItemData } from "@/types/menu/menu";

import { useDeleteDocument } from "@/api/document/hooks/useDeleteDocument";
import IconButton from "@/components/button/IconButton/IconButton";
import TitleEditor from "@/components/input/TitleEditor/TitleEditor";
import DrawerMenu from "@/components/menu/DrawerMenu/DrawerMenu";
import { DOCUMENT_CONFIG } from "@/constants/document/documentConfig";
import { useDocumentContext } from "@/hooks/document/useDocumentContext";
import { BaseComponent } from "@/types/root";
import { transformDateTo_DD_MMMM_YYYY_TIME_format } from "@/utils/date/formatDate";
import clsx from "clsx";
import { DownloadCloud, Ellipsis, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Document from "../Document/Document";
import ActionButton from "./ActionButton/ActionButton";
import styles from "./DocumentCard.module.scss";
import DocumentCardSkeleton from "./DocumentCardSkeleton";

export default function DocumentCard({ className }: BaseComponent) {
  const { document, isGetLoading, download, getHandler } = useDocumentContext();
  const { id: drawerId, isOpen, open, close } = useDrawer();
  const { mutate: deleteDocument } = useDeleteDocument();

  if (isGetLoading || !document) {
    return <DocumentCardSkeleton />;
  }

  const { updatedAt, title, id, type } = document;

  const editPathname = `/${DOCUMENT_CONFIG[type.name].typePlural}/${id}`;
  
  const actionsData: MenuItemData = [
    {
      type: "link",
      pathname: editPathname,
      className: styles.actionButtonEdit,
      id: "edit",
      Icon: Pencil,
      title: "Изменить",
    },
    {
      type: "control",
      className: styles.actionButtonDownloadPDF,
      id: "download-pdf",
      Icon: DownloadCloud,
      title: "Скачать в PDF",
      onClick: () => download(title),
    },
    {
      type: "control",
      className: styles.actionButtonDelete,
      id: "delete",
      Icon: Trash2,
      title: "Удалить",
      onClick: () => deleteDocument(id),
    },
  ];

  return (
    <>
      <div className={clsx(styles.card, className)}>
        <header className={styles.headerMobile}>
          <div className={styles.titleWrapper}>
            <TitleEditor
              className={styles.title}
              value={title}
              onChange={getHandler("title")}
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

        <Link className={styles.previewWrapper} href={editPathname}>
          <Document className={styles.preview} />
        </Link>
          
        <div className={styles.info}>
          <header className={styles.header}>
            <TitleEditor
              className={styles.title}
              value={title}
              onChange={getHandler("title")}
            />

            {updatedAt && (
              <time className={styles.updatedAt} dateTime={updatedAt}>
                Обновлен {transformDateTo_DD_MMMM_YYYY_TIME_format(new Date(updatedAt))}
              </time>
            )}
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