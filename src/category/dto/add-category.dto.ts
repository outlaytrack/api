import { IsOptional, IsString } from 'class-validator';

export class AddCategoryDto {
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  description?: string;
}
