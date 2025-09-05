import { AuthWrapper } from "../AuthWrapper/AuthWrapper";
import LoginContent from "./components/LoginContent/LoginContent";
import { LoginPageContent } from "./components/LoginPageContent/LoginPageContent";

export default function RegisterPage() {
	return (
		<AuthWrapper
			type="content"
			pageContent={<LoginPageContent />}
			content={<LoginContent />}
		/>
	);
}