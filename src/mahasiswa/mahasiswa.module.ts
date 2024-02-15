import { Module } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { MahasiswaService } from './mahasiswa.service';
import { MahasiswaController } from './mahasiswa.controller';

@Module({
  controllers: [MahasiswaController],
  providers: [MahasiswaService, PrismaService],
})
export class MahasiswaModule {}
