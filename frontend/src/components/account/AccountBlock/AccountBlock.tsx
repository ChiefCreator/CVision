"use client"

import { useCurrentUserQuery } from "@/api/user/hooks";
import AnimateHeightPresence from "@/components/utils/AnimatePresence/components/AnimateHeightPresence";
import { usePopover } from "@/hooks/position/usePopover";
import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import AccountDropdownMenu from "../AccountDropdownMenu/AccountDropdownMenu";
import UserAvatar from "../UserAvatar/UserAvatar";
import styles from "./AccountBlock.module.scss";
import AccountBlockSkeleton from "./AccountBlockSkeleton";

interface AccountBlockProps extends BaseComponent {
	hideInfo?: boolean;
}

export function AccountBlock({ className, hideInfo = false }: AccountBlockProps) {
	const { data: user, isPending } = useCurrentUserQuery();
	const { isOpen, triggerRef, contentRef, id, toggle } = usePopover();
	
	const { name, email, picture } = user ?? {};

	if (isPending) return <AccountBlockSkeleton className={className} avatarClassName={styles.avatar} />

	return (
		<>
			<button className={clsx(styles.block, className)} type="button" onClick={() => toggle()} ref={triggerRef as any}>
				<UserAvatar className={styles.avatar} name={name} picture={picture} />

				<AnimateHeightPresence isVisible={!hideInfo}>
					<div className={styles.info}>
						<span className={styles.name}>{name}</span>
						<span className={styles.email}>{email}</span>
					</div>
				</AnimateHeightPresence>
			</button>

			{isOpen && (
				<AccountDropdownMenu
					id={id}
					positioner={{
						contentRef,
						triggerRef,
						offsetY: 3,
						matchTriggerWidth: !hideInfo,
					}}
				/>
			)}
		</>
	)
}
