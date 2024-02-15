import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FakultasModule } from './fakultas/fakultas.module';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';

@Module({
  imports: [FakultasModule, MahasiswaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
