# Nest.js MinIO Module
A simple [Minio](https://min.io/) wrapper for [Nest.js](https://nestjs.com) .

## Installation

```bash
npm i minio-nestjs 
# or
yarn add minio-nestjs
```


## Module setup


Register module synchronously :

```typescript
import { Module } from '@nestjs/common';
import { MinioModule } from 'minio-nestjs';

@Module({
  imports: [
    MinioModule.register({
      endPoint: '127.0.0.1',
      port: 9000,
      useSSL: false,
      accessKey: 'biomousavi',
      secretKey: 'yourStrongPassword',
    }),
  ],
})
export class AppModule {}
```

Asynchronous registration:

```typescript
import { Module } from '@nestjs/common';
import { MinioModule } from 'minio-nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MinioModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          port: +configService.get('MINIO_PORT'),
          endPoint: configService.get('MINIO_ENDPOINT'),
          accessKey: configService.get('MINIO_ROOT_USER'),
          secretKey: configService.get('MINIO_ROOT_PASSWORD'),
          useSSL: configService.get('NODE_ENV') === 'production' ? true : false,
        };
      },
    }),
  ],
})
export class AppModule {}
```

## Module usage 

Now you have access to Minio client:

```typescript
import { Injectable } from '@nestjs/common';
import { MinioService } from 'minio-nestjs';

@Injectable()
export class FileService {
  constructor(private readonly minioService: MinioService) {}

  async getBuckets() {
    return await this.minioService.listBuckets();
  }
}
```