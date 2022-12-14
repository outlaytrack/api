import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    // return user according to request user
    return user;
  }

  @Put('update')
  update(@GetUser('id') userId: number, @Body() userUpdateDto: EditUserDto) {
    // call update user service
    return this.userService.update(userId, userUpdateDto);
  }
}
