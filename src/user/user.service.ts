import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async update(userId: number, userUpdateDto: EditUserDto) {
    try {
      // update user according to user id
      const user = await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          ...userUpdateDto,
        },
      });

      // remove hash from user model
      delete user.hash;

      // return
      return user;
    } catch (error) {
      throw new BadRequestException('Something went wrong!');
    }
  }
}
