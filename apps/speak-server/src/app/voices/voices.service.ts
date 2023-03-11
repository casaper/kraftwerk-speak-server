import { Injectable } from '@nestjs/common';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

import { Voice } from '../types/texttospeech';
import { RedisStoreService } from '../services/redis-store/redis-store.service';

@Injectable()
export class VoicesService {

  constructor(private readonly store: RedisStoreService) {}
  async getVoices(languageCode?: string): Promise<Voice[]> {
    const keyObject = { method: 'VoicesService.getVoices', languageCode };
    const cached = await this.store.getRequestResult<Voice[]>(keyObject);
    if (cached) {
      console.log('was cached')
      return cached;
    }
    console.log('not cached')
    const client = new TextToSpeechClient();
    const [result] = await client.listVoices({ languageCode });
    if (result?.voices) {
      this.store.storeRequestResult(keyObject, result.voices);
    }
    return result?.voices;
  }
}
