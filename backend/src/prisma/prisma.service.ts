import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AsyncLocalStorage } from "async_hooks";
import { Prisma, PrismaClient } from 'prisma/generated/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly als = new AsyncLocalStorage<Prisma.TransactionClient>();

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async runInTransaction<T>(fn: () => Promise<T>): Promise<T> {
    return this.$transaction(async (tx) => {
      return this.als.run(tx, fn);
    });
  }

  private get client(): PrismaClient | Prisma.TransactionClient {
    return this.als.getStore() ?? this;
  }

  get user() { return this.client.user; }
  get account() { return this.client.account; }
  get token() { return this.client.token; }
  get emailChangeToken() { return this.client.emailChangeToken; }

  get document() { return this.client.document; }
  get documentType() { return this.client.documentType; }
  get documentTemplate() { return this.client.documentTemplate; }
  get section() { return this.client.section; }
  get sectionTemplate() { return this.client.sectionTemplate; }
  get sectionTemplateRelation() { return this.client.sectionTemplateRelation; }
}
