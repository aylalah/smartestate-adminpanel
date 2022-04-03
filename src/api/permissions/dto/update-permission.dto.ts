import { PartialType } from '@nestjs/swagger';
import { CreatePermissionDto } from './create-permission.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNumber,
  IsArray,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { titleCase } from '../../../utils';
import { date } from '../../../utils/time.utils';
import { IsName } from '../../../utils/validation.util';
import { ManyToOne } from 'typeorm';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {

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

export class StatusDto {

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  status: number;

}
