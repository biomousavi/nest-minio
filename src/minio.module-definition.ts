import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ClientOptions } from 'minio';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ClientOptions>()
    .setExtras({ isGlobal: false }, (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }))
    .build();
