import { AuthWrapper } from "../AuthWrapper/AuthWrapper";
import { VerificationEmailPageContent } from "./components/VerificationEmailPageContent/VerificationEmailPageContent";

export default function NewEmailPage() {
	return (
		<AuthWrapper
			type="single"
			pageContent={<VerificationEmailPageContent />}
		/>
	);
}