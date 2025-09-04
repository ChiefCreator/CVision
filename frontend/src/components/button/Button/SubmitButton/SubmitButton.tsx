"use client"

import Spinner from "@/components/loading/Spinner/Spinner";
import clsx from "clsx";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitButtonProps } from "../Button";
import styles from "./SubmitButton.module.scss";

export function SubmitButton({
	className, children, Icon, iconClassName, status,
	titleVariants = { loading: "Отправка", error: "Ошибка", success: "Успешно" },
	onClick, setStatus
}: SubmitButtonProps) {
	const [title, setTitle] = useState(children);

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";
	const isIdle = status === "idle";

	useEffect(() => {
    if (status !== "idle") return setTitle(titleVariants[status]);
    
    setTitle(children);
  }, [status, setTitle, setStatus]);

	return (
		<button className={clsx(styles.button, className)} type="submit" onClick={onClick} disabled={!isIdle}>
      {Icon && <Icon className={clsx(styles.icon, iconClassName)} aria-hidden="true" />}

      {title}

			<div className={styles.state}>
        {isLoading && <Spinner className={styles.spinner} />}

        {isSuccess && <Check className={styles.icon} />}

        {isError && <X className={styles.icon} />}
      </div>
    </button>
	)
}
