import { AuthWrapper } from "../AuthWrapper/AuthWrapper";
import { VerificationEmailPageContent } from "./components/VerificationEmailPageContent/VerificationEmailPageContent";

export default function RegisterPage() {
	return (
		<AuthWrapper
			type="single"
			pageContent={<VerificationEmailPageContent />}
		/>
	);
}