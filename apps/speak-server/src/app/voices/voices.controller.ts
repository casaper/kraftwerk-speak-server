import { Controller, Get, Param } from '@nestjs/common';
import { VoicesService } from './voices.service';
import { Voice } from '../types/texttospeech';

@Controller('voices')
export class VoicesController {
  constructor(private readonly voicesService: VoicesService) {}

  @Get()
  getAll(): Promise<Voice[]> {
    return this.voicesService.getVoices();
  }

  @Get(':lang')
  getForLang(@Param('lang') lang: string): Promise<Voice[]> {
    return this.voicesService.getVoices(lang);
  }
}
