import { FactoryProvider, ModuleMetadata } from "@nestjs/common";
import { BaseOAuthService } from "./services/base-oauth.service";

export type ModuleSyncOptions = {
	baseUrl: string,
	services: BaseOAuthService[],
}

export type ModuleAsyncOptions = Pick<ModuleMetadata, "imports"> & Pick<FactoryProvider<ModuleSyncOptions>, "useFactory" | "inject">;
