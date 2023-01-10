import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService, private configService: ConfigService) {}

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    const isExist = await this.prismaService.user.findFirst({
      where: {
        email: dto.email,
        isDeleted: false,
      },
    });

    if (isExist) {
      // return error if user exist with email
      throw new BadRequestException('Email already exists');
    } else {
      try {
        // save the new user to the db
        const user = await this.prismaService.user.create({
          data: {
            email: dto.email,
            hash,
          },
        });

        // send back the user token
        return this.signToken(user.id, user.email);
      } catch (error) {
        throw new BadRequestException('Something went wrong!');
      }
    }
  }

  async signin(dto: AuthDto) {
    // find the not deleted user by email
    const user = await this.prismaService.user.findFirst({
      where: {
        email: dto.email,
        isDeleted: false,
      },
    });

    // if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);

    // if password incorrect throw exception
    if (!pwMatches) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    // send back the user token
    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    // define token payload
    const payload = {
      sub: userId,
      email,
    };

    // get jwt secret code from environment
    const secret = this.configService.get('JWT_SECRET');
    // create token
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    // send token back
    return {
      access_token: token,
    };
  }
}
