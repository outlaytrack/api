import { IsOptional, IsString } from 'class-validator';

export class EditCategoryDto {
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  description?: string;
}
