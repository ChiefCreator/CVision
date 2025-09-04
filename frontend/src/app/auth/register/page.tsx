import { AuthWrapper } from "../AuthWrapper/AuthWrapper";
import RegisterContent from "./components/RegisterContent/RegisterContent";
import { RegisterPageContent } from "./components/RegisterPageContent/RegisterPageContent";

export default function RegisterPage() {
	return (
		<AuthWrapper
			type="content"
			pageContent={<RegisterPageContent />}
			content={<RegisterContent />}
		/>
	);
}