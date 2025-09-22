import { OAuthProvider } from "@/types/auth/oauthProviders";
import { useUser } from "../user/useUser";

export default function useOAuthProvider(provider: OAuthProvider) {
	const { user } = useUser();

	const account = user?.accounts.find(a => a.provider === provider);

	return {
    isConnected: Boolean(account),
    account,
  };
}