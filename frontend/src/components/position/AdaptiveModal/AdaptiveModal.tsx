"use client";

import { useMediaQuery } from "react-responsive";

import { breakpoints } from "@/constants/breakpoints/breakpoints";
import { maxWidth } from "@/utils/media/maxWidth";
import Drawer, { DrawerProps } from "../Drawer/Drawer";
import Modal, { ModalProps } from "../Modal/Modal";

export type AdaptiveModalProps = ModalProps & DrawerProps;

export default function AdaptiveModal({
	className,
	id,
	isOpen,
	children,
	hasCloseButton,
	onClose,

	position,
	overlayClosable,

	title,
	hasBackButton,
	onBack,
}: AdaptiveModalProps) {
	const isMobile = useMediaQuery(maxWidth(breakpoints.tabletM));

	if (isMobile)
		return (
			<Drawer
				className={className}
				id={id}
				isOpen={isOpen}
				title={title}
				hasBackButton={hasBackButton}
				hasCloseButton={hasCloseButton}
				onClose={onClose}
				onBack={onBack}
			>
				{children}
			</Drawer>
		);

	return (
		<Modal
			className={className}
			id={id}
			isOpen={isOpen}
			position={position}
			overlayClosable={overlayClosable}
			hasCloseButton={hasCloseButton}
			onClose={onClose}
		>
			{children}
		</Modal>
	);
}
