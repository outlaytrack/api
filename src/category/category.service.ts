import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    try {
      // get all categories
      const categories = await this.prismaService.category.findMany({
        select: { name: true, id: true },
        where: { isDeleted: false },
      });

      // return categories
      return categories;
    } catch (error) {
      throw new BadRequestException('Something went wrong!');
    }
  }
}
