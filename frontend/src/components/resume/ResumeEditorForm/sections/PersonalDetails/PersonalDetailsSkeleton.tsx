import FormFieldEditInputSkeleton from "@/components/form/FormField/FormFieldInput/FormFieldEditInputSkeleton/FormFieldEditInputSkeleton";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import SectionSkeleton from "../../Section/SectionSkeleton";

import styles from "./../../Section/Section.module.scss";

export default function PersonalDetailsSkeleton() {
	return (
		<SectionSkeleton>
			<FormGroup className={styles.formGroup}>
				{Array.from({ length: 13 }).map((_, i) => (
					<FormGroupCell
						key={i}
						className={
							i === 2
								? styles.formGroupCellPersonalDetailsFullName
								: i === 5
								? styles.formGroupCellPersonalDetailsAddress
								: undefined
						}
					>
						<FormFieldEditInputSkeleton />
					</FormGroupCell>
				))}
			</FormGroup>
		</SectionSkeleton>
	);
}
