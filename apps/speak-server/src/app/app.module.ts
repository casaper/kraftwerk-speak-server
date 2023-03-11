import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoicesModule } from './voices/voices.module';

@Module({
  imports: [VoicesModule,   CacheModule.register<RedisClientOptions>({
    store: redisStore,

    // Store-specific configuration:
    host: 'localhost',
    port: 6379,
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
