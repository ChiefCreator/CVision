import { useDrawer } from "@/hooks/position/useDrawer";

import { Document as DocumentT } from "@/types/document/document";
import { MenuItemData } from "@/types/menu/menu";

import IconButton from "@/components/button/IconButton/IconButton";
import TitleEditor from "@/components/input/TitleEditor/TitleEditor";
import DrawerMenu from "@/components/menu/DrawerMenu/DrawerMenu";
import { DOCUMENT_CONFIG } from "@/constants/document/documentConfig";
import { BaseComponent } from "@/types/root";
import { transformDateTo_DD_MMMM_YYYY_TIME_format } from "@/utils/date/formatDate";
import clsx from "clsx";
import { DownloadCloud, Ellipsis, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Document from "../Document/Document";
import ActionButton from "./ActionButton/ActionButton";
import styles from "./DocumentCard.module.scss";

interface DocumentCardProps extends BaseComponent {
  data: DocumentT;
}

export default function DocumentCard({ className, data }: DocumentCardProps) {
  const { updatedAt, title, id } = data;

  const { id: drawerId, isOpen, open, close } = useDrawer();

  const editPathname = `/${DOCUMENT_CONFIG[data.type.name].typePlural}/${id}`;
  
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
      onClick: () => console.log("download"),
    },
    {
      type: "control",
      className: styles.actionButtonDelete,
      id: "delete",
      Icon: Trash2,
      title: "Удалить",
      onClick: () =>  console.log("delete"),
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
          <Document
            className={styles.preview}
            data={data}
          />
        </Link>
          
        <div className={styles.info}>
          <header className={styles.header}>
            <TitleEditor
              className={styles.title}
              value={title}
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