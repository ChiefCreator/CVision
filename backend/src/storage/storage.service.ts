import { DeleteObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UploadFileRequest } from "./types/service.types";

@Injectable()
export class StorageService {
  private s3: S3Client;
  private bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.getOrThrow("storage.yandex.bucket");

    this.s3 = new S3Client({
      region: this.configService.getOrThrow("storage.yandex.region"),
      endpoint: this.configService.getOrThrow("storage.yandex.endpoint"),
      credentials: {
        accessKeyId: this.configService.getOrThrow("storage.yandex.accessKey"),
        secretAccessKey: this.configService.getOrThrow("storage.yandex.secretKey"),
      },
    });
  };

  async uploadFile({ file, key }: UploadFileRequest) {
    const Key = `${key ?? new Date().getTime() + file.originalname}`;

    const exists = await this.keyExists(Key);

    if (exists) {
      await this.deleteFile(Key);
    }
    
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );
    
    return {
      url: `${this.configService.getOrThrow("storage.yandex.endpoint")}/${this.bucket}/${Key}?v=${Date.now()}`,
    };
  }

  private async keyExists(Key: string) {
    try {
      await this.s3.send(new HeadObjectCommand({ Bucket: this.bucket, Key }));

      return true;
    } catch (err: any) {
      if (err.name === "NotFound") return false;

      throw err;
    }
  }

  async deleteFile(key: string) {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
  }
}
