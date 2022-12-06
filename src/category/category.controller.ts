import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CategoryService } from './category.service';

@UseGuards(JwtGuard)
@Controller('categories')
export class CategoryController {
  constructor(private userService: CategoryService) {}

  @Get('')
  getAll() {
    return this.userService.getAll();
  }
}
