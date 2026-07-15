import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  stok_tersedia: number;

  @IsString()
  @IsOptional()
  description?: string;
}
