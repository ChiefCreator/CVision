import { AuthContent } from "../AuthContent/AuthContent";
import { AuthWrapper } from "../AuthWrapper/AuthWrapper";
import { RegisterPageContent } from "./components/RegisterPageContent/RegisterPageContent";

export default function RegisterPage() {
	return (
		<AuthWrapper
			type="content"
			pageContent={<RegisterPageContent />}
			content={
				<AuthContent
					title="Начните карьерный путь с идеального резюме"
					description="Зарегистрируйтесь за минуту и получите доступ к десяткам стильных шаблонов резюме и сопроводительных писем."
					sliderColumns={[
						{
							imageUrls: [
								"/images/resume/architect-resume-examples.jpg",
								"/images/resume/doctor-resume-examples.jpg",
								"/images/resume/internship-resume-examples.jpg",
							],
							direction: "down",
						},
						{
							imageUrls: [
								"/images/resume/legal-resume-examples.jpg",
								"/images/resume/student-resume-examples.jpg",
								"/images/resume/retail-resume-examples.jpg",
							],
							direction: "up",
						},
					]}
				/>
			}
		/>
	);
}
