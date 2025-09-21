import DangerousZoneSection from "@/app/(home)/settings/account/components/DangerousZoneSection/DangerousZoneSection";
import OAuthProvidersSection from "@/app/(home)/settings/account/components/OAuthProvidersSection/OAuthProvidersSection";
import ProfileSection from "@/app/(home)/settings/account/components/ProfileSection/ProfileSection";
import SubscriptionSection from "@/app/(home)/settings/account/components/SubscriptionSection/SubscriptionSection";

export const sectionComponentsMap = {
	subscription: SubscriptionSection,
	profile: ProfileSection,
	oauthProviders: OAuthProvidersSection,
	dangerousZone: DangerousZoneSection,
}