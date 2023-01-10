import { Module } from '@nestjs/common';
import { OutlayController } from './outlay.controller';
import { OutlayService } from './outlay.service';

@Module({
  controllers: [OutlayController],
  providers: [OutlayService],
})
export class OutlayModule {}
