import { ClientOptions, Client } from 'minio';

// minio singleton client
export class Minio extends Client {
  private static instance: Minio;

  constructor(options: ClientOptions) {
    if (Minio.instance) return Minio.instance;

    super(options);
    Minio.instance = this;
  }
}
