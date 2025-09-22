import ColorGoogleIcon from "@/components/icon/ColorGoogleIcon";
import ColorYandexIcon from "@/components/icon/ColorYandexIcon";
import { GoogleIcon } from "@/components/icon/GoogleIcon";
import { YandexIcon } from "@/components/icon/YandexIcon";

export const oAuthProvidersMap = {
	google: {
		Icon: GoogleIcon,
		ColorIcon: ColorGoogleIcon,
		label: "Google",
	},
	yandex: {
		Icon: YandexIcon,
		ColorIcon: ColorYandexIcon,
		label: "Яндекс",
	},
}