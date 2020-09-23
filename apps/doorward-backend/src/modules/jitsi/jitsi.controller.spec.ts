import { Test, TestingModule } from '@nestjs/testing';
import { JitsiController } from './jitsi.controller';

describe('Jitsi Controller', () => {
  let controller: JitsiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JitsiController],
    }).compile();

    controller = module.get<JitsiController>(JitsiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
