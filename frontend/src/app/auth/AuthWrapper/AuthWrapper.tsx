import { ContentAuthWrapper } from "./ContentAuthWrapper/ContentAuthWrapper";
import { SingleAuthWrapper } from "./SingleAuthWrapper/SingleAuthWrapper";

interface BaseAuthWrapperProps {
	pageContent: React.ReactNode;
}

export interface ContentAuthWrapperProps extends BaseAuthWrapperProps {
	type: "content";
	content: React.ReactNode;
}

export interface SingleAuthWrapperProps extends BaseAuthWrapperProps {
	type: "single";
}

type AuthWrapperProps = ContentAuthWrapperProps | SingleAuthWrapperProps;

export function AuthWrapper(props: AuthWrapperProps) {
	switch(props.type) {
		case "content": return <ContentAuthWrapper {...props} />;
		case "single": return <SingleAuthWrapper {...props} />;
	}
}
