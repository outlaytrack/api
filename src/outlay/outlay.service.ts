import { BadRequestException, Injectable } from '@nestjs/common';
import { Outlay } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EditOutlayDto } from './dto/edit-outlay.dto';

@Injectable()
export class OutlayService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    try {
      // get all available outlays
      const outlays = await this.prismaService.outlay.findMany({
        where: { isDeleted: false },
      });

      // return
      return outlays;
    } catch (error) {
      throw new BadRequestException('Something went wrong!');
    }
  }

  async getById(id: number) {
    try {
      // get outlay by id
      const outlays = await this.prismaService.outlay.findMany({
        where: { isDeleted: false, id },
      });

      // return
      return outlays;
    } catch (error) {
      throw new BadRequestException('Something went wrong!');
    }
  }
  async create(outlayDto: Outlay) {
    try {
      // save the new user to the db
      const outlay = await this.prismaService.outlay.create({
        data: outlayDto,
      });

      // send back the user token
      return outlay;
    } catch (error) {
      throw new BadRequestException('Something went wrong!');
    }
  }

  async update(id: number, userUpdateDto: EditOutlayDto) {
    try {
      // update outlay according to id
      const outlay = await this.prismaService.outlay.update({
        where: {
          id,
        },
        data: {
          ...userUpdateDto,
        },
      });

      // return
      return outlay;
    } catch (error) {
      throw new BadRequestException('Something went wrong!');
    }
  }
}
