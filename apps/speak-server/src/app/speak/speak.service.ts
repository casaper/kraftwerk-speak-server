import { Injectable } from '@nestjs/common';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import os from 'os';
import PlaySound from 'play-sound';

import { RedisStoreService } from '../services/redis-store/redis-store.service';
import {
  ISynthesizeSpeechRequest,
  ISynthesizeSpeechResponse,
} from '../types/texttospeech';

@Injectable()
export class SpeakService {
  constructor(private readonly store: RedisStoreService) {}

  async speakText(
    text: string,
    {
      languageCode = 'en-GB',
      name = 'en-GB-Standard-D',
      ssmlGender = 'MALE',
      customVoice,
    }: ISynthesizeSpeechRequest['voice'] = {},
    {
      audioEncoding = 'MP3',
      ...audioConfig
    }: ISynthesizeSpeechRequest['audioConfig'] = {}
  ): Promise<ISynthesizeSpeechResponse> {
    const request: ISynthesizeSpeechRequest = {
      input: { text },
      voice: { languageCode, name, ssmlGender, customVoice },
      audioConfig: { audioEncoding, ...audioConfig },
    };
    const cacheKey = this.store.getKey(request, 'speakText', 'SpeakService');
    const cached = await this.tryLoadCached(cacheKey);
    if (cached) {
      return cached;
    }
    console.log('not cached');
    const client = new TextToSpeechClient();
    const [result] = await client.synthesizeSpeech(request);
    if (result) {
      this.store.storeRequestResult(cacheKey, result);
    }
    if (result?.audioContent) {
      this.sayResult(cacheKey, result.audioContent);
    }
    return result;
  }

  private async tryLoadCached(
    cacheKey: string
  ): Promise<ISynthesizeSpeechResponse | void> {
    const cached = await this.store.getRequestResult<{ audioContent: unknown }>(
      cacheKey
    );
    if (!cached) {
      return;
    }
    console.log('was cached');
    const cachedResult = this.cachedToResponse(cached);
    if (cachedResult?.audioContent) {
      this.sayResult(cacheKey, cachedResult.audioContent);
    }
    return cachedResult;
  }

  private async sayResult(
    cacheKey: string,
    audio: ISynthesizeSpeechResponse['audioContent']
  ): Promise<string> {
    const mp3Path = await this.saveMp3TempFile(cacheKey, audio);
    const player = PlaySound({});
    player.play(mp3Path, (err) => {
      console.error(err);
    });
    return mp3Path;
  }

  private async saveMp3TempFile(
    key: string,
    result: ISynthesizeSpeechResponse['audioContent']
  ): Promise<string> {
    const tmpFilePath = `${os.tmpdir()}/google-tts-file-${key}.mp3`;
    if (existsSync(tmpFilePath)) {
      return tmpFilePath;
    }
    await writeFile(tmpFilePath, result, 'binary');
    return tmpFilePath;
  }

  private cachedToResponse(cached: {
    audioContent: unknown;
  }): ISynthesizeSpeechResponse {
    if (
      typeof cached.audioContent === 'object' &&
      (cached.audioContent as any).data
    ) {
      const audioContent = Buffer.from((cached.audioContent as any).data);
      return { audioContent };
    }
  }
}
