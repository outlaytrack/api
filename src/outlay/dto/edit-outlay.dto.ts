import { IsOptional, IsString } from 'class-validator';

export class EditOutlayDto {
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsString()
  @IsOptional()
  photo?: string;
}
