import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumberString,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { IsName } from '../../../utils/validation.util';

export class CreateRoleDto {

  @IsString()
  @IsName()
  @Length(1, 52)
  @ApiProperty()
  user_type: string;

    @IsString()
    @Length(1, 52)
    @ApiProperty()
    role_name: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    @ApiProperty()
    description: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    @ApiProperty()
    slug: string;

}

