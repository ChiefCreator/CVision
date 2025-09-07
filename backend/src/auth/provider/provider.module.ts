import { DynamicModule, Module } from "@nestjs/common";

import { ProviderOptionsSymbol } from "./provider.constants";
import { ProviderService } from "./provider.service";
import { ModuleAsyncOptions, ModuleSyncOptions } from "./provider.types";

@Module({})
export class ProviderModule {
	public static register(options: ModuleSyncOptions): DynamicModule {
		return {
			module: ProviderModule,
			providers: [
				{
					useValue: options.services,
					provide: ProviderOptionsSymbol,
				},
				ProviderService,
			],
			exports: [ProviderService],
		};
	}

	public static registerAsync(options: ModuleAsyncOptions): DynamicModule {
		return {
			module: ProviderModule,
			imports: options.imports,
			providers: [
				{
					useFactory: options.useFactory,
					provide: ProviderOptionsSymbol,
					inject: options.inject,
				},
				ProviderService,
			],
			exports: [ProviderService],
		};
	}
}
