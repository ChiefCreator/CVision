import { useConnectByProviderMutation } from "@/api/auth/hooks";
import Button from "@/components/button/Button/Button";
import { useDisconnectProvider } from "@/hooks/auth/useDisconnectProvider";
import useOAuthProvider from "@/hooks/auth/useOAuthProvider";
import { OAuthProvider } from "@/types/auth/oauthProviders";
import SettingField from "../SettingField/SettingField";

interface ProviderControlProps {
	provider: OAuthProvider; 
	Icon: React.ComponentType<React.RefAttributes<SVGSVGElement>>;
	label: string;
}

export default function ProviderControl({ provider, Icon, label }: ProviderControlProps) {
	const { account, isConnected } = useOAuthProvider(provider);

  const { mutate: connect } = useConnectByProviderMutation();
  const { disconnect, state, setState } = useDisconnectProvider();

  const connectProvider = () => connect({ provider, mode: "connect" });
  const disconnectProvider = () => disconnect(provider);

	const connectButton = (
		<Button
      type="simpleButton"
      variant="primary"
      onClick={connectProvider}
    >
      Подключить
    </Button>
	);

	const disconnectButton = (
		<Button
      type="submit"
      variant="primary"
      status={state}
      setStatus={setState}
      onClick={disconnectProvider}
    >
      Отключить
    </Button>
	);

  return (
    <SettingField
      title={label}
      description={account?.email}
      Icon={Icon}
      control={isConnected ? disconnectButton : connectButton}
    />
  );
}
