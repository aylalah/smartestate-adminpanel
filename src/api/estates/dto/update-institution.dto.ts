import { PartialType } from '@nestjs/swagger';
import { CreateInstitutionDto } from './create-institution.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { IsName } from '../../../utils/validation.util';

export class UpdateInstitutionDto extends PartialType(CreateInstitutionDto) {

  @IsString()
  @Length(1, 100)
  @ApiProperty()
  estate_name: string;

  @IsString()
  @Length(1, 100)
  @ApiProperty()
  estate_code: string;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  @ApiProperty()
  phone_number: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsName()
  @IsString()
  @Length(1, 50)
  @ApiProperty()
  web_url: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  @ApiProperty()
  plan: string;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  @ApiProperty()
  address: string;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  @ApiProperty()
  state: string;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  @ApiProperty()
  lga: string;

  @IsOptional()
  @ApiProperty()
  logo: string;

}

export class StatusDto {

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    status: number;
  
  }
