import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumberString,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  Length,
} from 'class-validator';
import { IsName } from '../../../utils/validation.util';

export class CreatePermissionDto {

    @IsString()
    @Length(1, 52)
    @ApiProperty()
    role_id: string;

    @IsString()
    @Length(1, 52)
    @ApiProperty()
    permission_name: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    @ApiProperty()
    description: string;

    @IsOptional()
    @IsArray()
    @ApiProperty()
    module_access: [];

}