import { OAuthProvider } from "@/types/auth/oauthProviders";

export const authKeys = {
  root: ["auth"] as const,
  user: () => [...authKeys.root, "user"] as const,
  current: () => ["users", "current"] as const,
  provider: ["provider"],
  connect: (provider: OAuthProvider) => [...authKeys.root, "connect", provider] as const,
};