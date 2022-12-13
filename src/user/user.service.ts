import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async update(userId: number, userUpdateDto) {
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
    return user;
  }
}
