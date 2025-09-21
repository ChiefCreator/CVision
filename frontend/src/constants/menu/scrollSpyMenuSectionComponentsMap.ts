import DangerousZoneSection from "@/app/(home)/settings/account/components/DangerousZoneSection/DangerousZoneSection";
import OAuthProvidersSection from "@/app/(home)/settings/account/components/OAuthProvidersSection/OAuthProvidersSection";
import ProfileSection from "@/app/(home)/settings/account/components/ProfileSection/ProfileSection";
import SubscriptionSection from "@/app/(home)/settings/account/components/SubscriptionSection/SubscriptionSection";
import UserSettingsSection from "@/app/(home)/settings/account/components/UserSettingsSection/UserSettingsSection";

export const sectionComponentsMap = {
	subscription: SubscriptionSection,
	profile: ProfileSection,
	userSettingsSection: UserSettingsSection,
	oauthProviders: OAuthProvidersSection,
	dangerousZone: DangerousZoneSection,
}