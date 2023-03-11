import { Injectable } from '@nestjs/common';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { writeFile } from 'fs/promises'
import hash from 'object-hash';

import { RedisStoreService } from '../services/redis-store/redis-store.service';
import { ISynthesizeSpeechRequest, ISynthesizeSpeechResponse } from '../types/texttospeech';


@Injectable()
export class SpeakService {
  constructor(private readonly store: RedisStoreService) {}

  async speakText(
    text: string,
    {
      languageCode = 'en-GB',
      name = 'en-GB-Standard-D',
      ssmlGender = 'MALE',
      customVoice
    }: ISynthesizeSpeechRequest['voice'] = {},
    { audioEncoding = 'MP3', ...audioConfig }: ISynthesizeSpeechRequest['audioConfig']  = {}
  ): Promise<ISynthesizeSpeechResponse> {
    const request: ISynthesizeSpeechRequest = {
      input: { text },
      voice: { languageCode, name, ssmlGender, customVoice },
      audioConfig: { audioEncoding, ...audioConfig }
    };
    const keyObject = { method: 'speakText', request };
    const cached = await this.store.getRequestResult<ISynthesizeSpeechResponse>(keyObject);
    if (cached) {
      console.log('was cached')
      return cached;
    }
    console.log('not cached')
    const client = new TextToSpeechClient();
    const [result] = await client.synthesizeSpeech(request);
    if (result) {
      this.store.storeRequestResult(keyObject, result);
      writeFile(`/tmp/spoken-text-${hash(keyObject)}.mp3`, result.audioContent, 'binary');
    }
    return result;
  }
}
