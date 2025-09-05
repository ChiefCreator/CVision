"use client"

import { useConnectByProviderMutation } from "@/api/auth/hooks";
import { OAuthProvider } from "@/types/auth/oauthProviders";
import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import styles from "./OAuthProviders.module.scss";
import { oAuthProvidersMap } from "./oAuthProvidersMap";

interface OAuthProvidersProps extends BaseComponent {
	providers: OAuthProvider[];
}

export function OAuthProviders({ className, providers }: OAuthProvidersProps) {
	const { mutate } = useConnectByProviderMutation();

	const connectProvider = (provider: OAuthProvider) => {
		mutate(provider);
	}

	return (
		<div className={clsx(styles.providers, className)}>
			<div className={styles.lineBlock}>
				<span className={styles.lineBlockLine}></span>
				<span className={styles.lineBlockText}>Или</span>
				<span className={styles.lineBlockLine}></span>
			</div>

			<ul className={styles.list}>
				{providers.map(provider => {
					const { Icon, label } = oAuthProvidersMap[provider];

					return (
						<li className={styles.providerWrapper} key={provider}>
							<button className={styles.provider} onClick={() => connectProvider(provider)}>
								<Icon className={styles.providerIcon} />
								<label className={styles.providerLabel}>{label}</label>
							</button>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
