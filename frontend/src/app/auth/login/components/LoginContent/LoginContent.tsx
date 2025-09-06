import { DocumentSlider } from "@/components/slider/DocumentSlider/DocumentSlider";
import styles from "./LoginContent.module.scss";

export default function LoginContent() {
	return (
		<div className={styles.content}>
			<div className={styles.info}>
				<h2 className={styles.title}>Шаблоны на любой вкус</h2>

				<p className={styles.description}>Выбирайте из сотен профессионально оформленных шаблонов резюме и сопроводительных писем.
					<br />Каждый стиль создан, чтобы подчеркнуть ваши сильные стороны и помочь работодателю заметить именно вас.</p>
			</div>

			<div className={styles.sliderWrapper}>
				<div className={styles.overlay}>
					<div className={styles.overlayGradient}></div>
					<div className={styles.overlayGradient}></div>
				</div>

				<DocumentSlider
					className={styles.slider}
					columns={[
						{
							imageUrls: ["/images/resume/architect-resume-examples.jpg", "/images/resume/doctor-resume-examples.jpg", "/images/resume/internship-resume-examples.jpg",],
							direction: "up",
						},
						{
							imageUrls: ["/images/resume/legal-resume-examples.jpg", "/images/resume/student-resume-examples.jpg", "/images/resume/retail-resume-examples.jpg"],
							direction: "down",
						}
					]}
				/>
			</div>
		</div>
	);
}
