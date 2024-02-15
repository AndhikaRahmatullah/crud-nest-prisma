import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../src/prisma.service';
import { FakultasService } from './fakultas.service';
import { FakultasController } from './fakultas.controller';

describe('FakultasController', () => {
  let fakultasController: FakultasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FakultasController],
      providers: [FakultasService, PrismaService],
    }).compile();

    fakultasController = module.get<FakultasController>(FakultasController);
  });

  it('should be defined', () => {
    expect(fakultasController).toBeDefined();
  });
});

// COMING SOON LAH YA TESTING MAH...
