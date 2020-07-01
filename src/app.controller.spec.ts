import { Test, TestingModule } from '@nestjs/testing';
import { BarberController } from './app.controller';
import { BarberService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [BarberController],
      providers: [BarberService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<BarberController>(BarberController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});