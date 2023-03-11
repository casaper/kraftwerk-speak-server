import { Injectable } from '@nestjs/common';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

import { Voice } from '../types/texttospeech';

@Injectable()
export class VoicesService {
  async getVoices(languageCode?: string): Promise<Voice[]> {
    const client = new TextToSpeechClient();
    const [result] = await client.listVoices({ languageCode });
    return result.voices;
  }
}
