import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ProviderOptionsSymbol } from "./provider.constants";
import { ModuleSyncOptions } from "./provider.types";

@Injectable()
export class ProviderService implements OnModuleInit {
  constructor(
    @Inject(ProviderOptionsSymbol) private readonly options: ModuleSyncOptions
  ) {};

  onModuleInit() {
    for (const provider of this.options.services) {
      provider.base_url = this.options.baseUrl;
    }
  }

  findByService(service: string) {
    return this.options.services.find(s => s.name === service) ?? null;
  }
}
