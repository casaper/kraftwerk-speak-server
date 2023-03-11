import { Module, CacheModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisStoreService } from './services/redis-store/redis-store.service';
import { VoicesService } from './voices/voices.service';
import { VoicesController } from './voices/voices.controller';
import { SpeakService } from './speak/speak.service';
import { SpeakController } from './speak/speak.controller';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 86400,
      max: 1000,
    }),
  ],
  controllers: [AppController, VoicesController, SpeakController],
  providers: [AppService, RedisStoreService, VoicesService, SpeakService],
})
export class AppModule {}
