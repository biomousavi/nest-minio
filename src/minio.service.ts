import { Inject, Injectable } from '@nestjs/common';
import { ClientOptions } from 'minio';
import { Minio } from './minio.client';
import { MODULE_OPTIONS_TOKEN } from './minio.module-definition';

@Injectable()
export class MinioService extends Minio {
  constructor(@Inject(MODULE_OPTIONS_TOKEN) options: ClientOptions) {
    super(options);
  }
}
