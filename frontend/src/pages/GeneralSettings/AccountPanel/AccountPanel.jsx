import { useUser } from "../../../context/UserContext";

import Button from "./../../../components/Button/Button";

import styles from "./AccountPanel.module.scss";

export default function AccountPanel({ buttonEditConfig }) {
  const { userData } = useUser();

  return (
    <div className={styles.accountPanel}>
      <div className={styles.accountPanelImgWrapper}>
        <svg className={styles.accountPanelImg} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32">
          <g clip-rule="evenodd" fill-rule="evenodd">
            <path d="m0 0h32v32h-32z" fill="#eff2f9" />
            <path d="m9 23c0 .6.5 1 1 1h12c.5 0 1-.4 1-1v-1a1 1 0 0 0 -.7-1l-3.7-1.4a.6.6 0 0 1 -.3-.5v-.6c0-.2 0-.3.2-.4.6-.7 1.1-1.9 1.2-2.2l.1-.1c.2-.1.4-.4.5-1s0-1-.2-1.1l-.2-.3v-2.6a3 3 0 0 0 -2-2.5c-1-.4-2.8-.4-3.8 0a3 3 0 0 0 -2 2.5v2.6l-.2.3c-.1.1-.4.5-.2 1 0 .7.3 1 .4 1l.2.2c0 .4.5 1.4 1.2 2.2l.2.4v.6c0 .2-.2.4-.4.6l-3.6 1.3a1 1 0 0 0 -.6 1v.9z" fill="#bec4d5" />
          </g>
        </svg>
      </div>
      <div className={styles.accountPanelInfo}>
        <span className={styles.accountPanelName}>{userData?.name}</span>
        <span className={styles.accountPanelMail}>{userData?.email}</span>

        {buttonEditConfig && <Button className={styles.accountPanelButton} onClickCallback={buttonEditConfig.onClick}>Изменить профиль</Button>}
      </div>
    </div>
  );
}
