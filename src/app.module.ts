import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsService } from './utils/utils.service';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [AppController],
  providers: [AppService, UtilsService],
})
export class AppModule {}
