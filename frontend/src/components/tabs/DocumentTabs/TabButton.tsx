import clsx from 'clsx';
import styles from './DocumentTabs.module.scss';

interface TabButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  ref: (el: HTMLButtonElement) => void;
}

export default function TabButton({ id, children, isActive, ref, onClick }: TabButton) {
  return (
    <button
      className={clsx(styles.button, isActive && styles.buttonActive)}
      ref={ref}
      id={id}
      type="button"
      onClick={onClick}
    >{children}</button>
  );
}