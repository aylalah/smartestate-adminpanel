import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { IsName } from '../../../utils/validation.util';

export class CreateInstitutionDto {

    @IsString()
    @Length(1, 100)
    @ApiProperty()
    estate_name: string;

    // @IsString()
    // @Length(1, 100)
    // @ApiProperty()
    // estate_code: string;

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
    @Length(1, 100)
    @ApiProperty()
    contact_person_first_name: string;

    @IsOptional()
    @IsName()
    @IsString()
    @Length(1, 100)
    @ApiProperty()
    contact_person_last_name: string;

    @IsOptional()
    @IsString()
    @Length(1, 50)
    @ApiProperty()
    website_name: string;

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

    @IsOptional()
    @IsString()
    @Length(1, 100)
    @ApiProperty()
    bank: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    @ApiProperty()
    account_number: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    @ApiProperty()
    account_name: string;

}