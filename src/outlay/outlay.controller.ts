import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Outlay } from '@prisma/client';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { EditOutlayDto } from './dto/edit-outlay.dto';
import { OutlayService } from './outlay.service';

@UseGuards(JwtGuard)
@Controller('outlays')
export class OutlayController {
  constructor(private outlayService: OutlayService) {}

  @Get()
  getAll() {
    // return all outlays
    return this.outlayService.getAll();
  }

  @Get(':id')
  getById(@Param() params) {
    // return outlay according to request param
    return this.outlayService.getById(params.id);
  }

  @Post()
  create(@Body() outlayDto: Outlay) {
    // call create outlay service
    return this.outlayService.create(outlayDto);
  }

  @Put('update')
  update(@Param() params, @Body() outlayUpdateDto: EditOutlayDto) {
    // call update outlay service
    return this.outlayService.update(params.id, outlayUpdateDto);
  }
}
