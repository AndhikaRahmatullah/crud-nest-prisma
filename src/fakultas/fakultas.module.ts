import { Module } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { FakultasService } from './fakultas.service';
import { FakultasController } from './fakultas.controller';

@Module({
  controllers: [FakultasController],
  providers: [FakultasService, PrismaService],
})
export class FakultasModule {}
