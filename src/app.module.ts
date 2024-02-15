import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FakultasModule } from './fakultas/fakultas.module';

@Module({
  imports: [FakultasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
