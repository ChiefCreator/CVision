import { toastService } from "@/api/toast/toastService";
import { Toast } from "@/components/toast/Toast/Toast";
import isError from "@/utils/error/isError";
import { isAxiosError } from "axios";
import { hasMessage } from "../api/hasMessage";
import { splitMessage } from "../api/splitMessage";

export function toastMessageHandler(res: Error | any) {
	if (isAxiosError(res)) {
		if (res.response?.data?.message) {
			const errorMessage = res.response.data.message as string;
			const { title, description } = splitMessage(errorMessage);

			toastService.custom(<Toast type="error" title={title} description={description}/>);
		} else if (res.message) {
			toastService.custom(<Toast type="error" title={res.message}/>);
		} else {
			toastService.custom(<Toast type="error" title={"Ошибка на стороне сервера"}/>);
		}

		return;
	}

	if (isError(res)) {
		return toastService.custom(<Toast type="error" title={res.message}/>);
	}

	if (hasMessage(res)) {
		const { title, description } = splitMessage(res.message);

		return toastService.custom(<Toast type="success" title={title} description={description} />);
	}
}
