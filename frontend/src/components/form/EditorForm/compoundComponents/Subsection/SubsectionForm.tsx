import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";
import { Subsection as SubsectionT } from "@/types/document/section/section";
import { SectionTemplateKey } from "@/types/document/sectionTemplate/sectionTemplateKey";
import { Dispatch, SetStateAction } from "react";
import { useSubsection } from "./hooks/useSubsection";
import Subsection from "./Subsection";

interface SubsectionFormProps<
	T extends DocumentTypeName = DocumentTypeName,
	K extends SectionTemplateKey<T> = SectionTemplateKey<T>
> {
	subsection: SubsectionT<T, K>;
	title?: string;
	subtitle?: string;
	children: (props: {
		isFirstInputFocused: boolean;
		data: SubsectionT<T, K>["data"];
		setIsFirstInputFocused: Dispatch<SetStateAction<boolean>>
		changeField: (path: string, val: string) => void;
	}) => React.ReactNode;
}

export function SubsectionForm<T extends DocumentTypeName, K extends SectionTemplateKey<T>>({
	subsection,
	title,
	subtitle,
	children,
}: SubsectionFormProps<T, K>) {
	const subsectionData = useSubsection(subsection);

	const {
		id,
		data,
		isOpen,
		popoverProps,
		isFirstInputFocused,
		changeField,
		deleteSubsection,
		handleClickHeader,
		handleControlClick,
		handleClickToChange,
		setIsFirstInputFocused,
	} = subsectionData;

	return (
		<Subsection
			id={id}
			title={title}
			subtitle={subtitle}
			isOpen={isOpen}
			dropdownMenuProps={popoverProps}
			deleteSubsection={deleteSubsection}
			handleClickHeader={handleClickHeader}
			handleControlClick={handleControlClick}
			onClickChange={handleClickToChange}
		>
			{children({
				data,
				isFirstInputFocused,
				changeField,
				setIsFirstInputFocused
			})}
		</Subsection>
	);
}
