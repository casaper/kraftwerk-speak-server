import { Body, Controller, Post } from '@nestjs/common';

import { SpeakService } from './speak.service';
import { ISynthesizeSpeechResponse } from '../types/texttospeech';

@Controller('speak')
export class SpeakController {
  constructor(private readonly speakService: SpeakService) {}

  @Post()
  async speak(@Body() speakBody: { text: string }): Promise<ISynthesizeSpeechResponse> {
    return this.speakService.speakText(speakBody.text)
  }
}
