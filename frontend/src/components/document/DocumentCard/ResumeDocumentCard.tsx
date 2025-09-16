import { useRouter } from 'next/navigation';
import { useDeleteResume, useResumeAutoUpdate } from '@/api/resume/hooks';

import { transformDateTo_DD_MMMM_YYYY_TIME_format } from '@/utils/date/formatDate';

import Document from '../Document/Document';
import TitleEditor from '@/components/input/TitleEditor/TitleEditor';
import ActionButton from './ActionButton/ActionButton';
import { DownloadCloud, Pencil, Trash2 } from 'lucide-react';

import type { Resume } from '@/types/resume/resume';

import styles from "./DocumentCard.module.scss";
import { usePdfDownloader } from '@/api/document/hooks/usePdfDownloader';

interface ResumeDocumentCardProps {
  data: Resume;
}

export default function ResumeDocumentCard({ data }: ResumeDocumentCardProps) {
  const { updatedAt, title, id } = data;

  const { push } = useRouter();
  const { changeField } = useResumeAutoUpdate(id);
  const { mutate: deleteResume } = useDeleteResume();
  const { downloadPdf } = usePdfDownloader();
  
  const editResume = (id: string) => push(`/resumes/${id}`);

  return (
    <div className={styles.card}>
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
          <ActionButton
            className={styles.actionButtonEdit}
            Icon={Pencil}
            onClick={() => editResume(id)}
          >Изменить</ActionButton>
          <ActionButton
            className={styles.actionButtonDownloadPDF}
            Icon={DownloadCloud}
            onClick={() => downloadPdf("resume", id)}
          >Скачать в PDF</ActionButton>
          <ActionButton
            className={styles.actionButtonDelete}
            Icon={Trash2} 
            onClick={() => deleteResume(id)}
          >Удалить</ActionButton>
        </div>
      </div>
    </div>
  );
}