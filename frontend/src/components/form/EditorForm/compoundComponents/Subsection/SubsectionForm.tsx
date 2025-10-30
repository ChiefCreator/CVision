import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";
import { Subsection as SubsectionT } from "@/types/document/section/section";
import { SectionTemplateKey } from "@/types/document/sectionTemplate/sectionTemplateKey";
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
		onToggleFirstInputFocus: (isFocused?: boolean | undefined) => void
		getDataFieldHandler: (path: string, options?: {
      extractValue?: ((arg: any) => any);
    }) => (arg: any) => void;
	}) => React.ReactNode;
}

export function SubsectionForm<T extends DocumentTypeName, K extends SectionTemplateKey<T>>({
	subsection,
	title,
	subtitle,
	children,
}: SubsectionFormProps<T, K>) {
	const {
		id,
		data,
		isOpen,
		popoverProps,
		isFirstInputFocused,
		getDataFieldHandler,
		deleteSubsection,
		toggleFirstInputFocus,
		handleHeaderClick,
		handleControlClick,
		handleClickToChange,
	} = useSubsection(subsection);

	return (
		<Subsection
			id={id}
			title={title}
			subtitle={subtitle}
			isOpen={isOpen}
			dropdownMenuProps={popoverProps}
			onDeleteSubsection={deleteSubsection}
			onHeaderClick={handleHeaderClick}
			onControlClick={handleControlClick}
			onChangeClick={handleClickToChange}
		>
			{children({
				data,
				isFirstInputFocused,
				getDataFieldHandler,
				onToggleFirstInputFocus: toggleFirstInputFocus,
			})}
		</Subsection>
	);
}
