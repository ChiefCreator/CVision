import { AuthContent } from "../AuthContent/AuthContent";
import { AuthWrapper } from "../AuthWrapper/AuthWrapper";
import { LoginPageContent } from "./components/LoginPageContent/LoginPageContent";

export default function LoginPage() {
	return (
		<AuthWrapper
			type="content"
			pageContent={<LoginPageContent />}
			content={
				<AuthContent
					title="Шаблоны на любой вкус"
					description={
						<>
							Выбирайте из сотен профессионально оформленных шаблонов резюме и
							сопроводительных писем.
							<br />
							Каждый стиль создан, чтобы подчеркнуть ваши сильные стороны и
							помочь работодателю заметить именно вас.
						</>
					}
					sliderColumns={[
						{
							imageUrls: [
								"/images/resume/architect-resume-examples.jpg",
								"/images/resume/doctor-resume-examples.jpg",
								"/images/resume/internship-resume-examples.jpg",
							],
							direction: "up",
						},
						{
							imageUrls: [
								"/images/resume/legal-resume-examples.jpg",
								"/images/resume/student-resume-examples.jpg",
								"/images/resume/retail-resume-examples.jpg",
							],
							direction: "down",
						},
					]}
				/>
			}
		/>
	);
}
