import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { titleCase } from '../../../utils';
import { date } from '../../../utils/time.utils';
import { IsName } from '../../../utils/validation.util';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {

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

export class StatusDto {

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  status: number;

}
