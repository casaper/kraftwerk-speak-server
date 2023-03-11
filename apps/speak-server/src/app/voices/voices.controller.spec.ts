import { Test, TestingModule } from '@nestjs/testing';
import { VoicesController } from './voices.controller';

describe('VoicesController', () => {
  let controller: VoicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoicesController],
    }).compile();

    controller = module.get<VoicesController>(VoicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
