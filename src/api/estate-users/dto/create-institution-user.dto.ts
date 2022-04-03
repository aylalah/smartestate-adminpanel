import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsObject,
  IsString,
  Length,
} from 'class-validator';
import { IsName } from '../../../utils/validation.util';

export class CreateInstitutionUserDto {

    // USERS DETAILS

    @IsString()
    @Length(1, 52)
    @ApiProperty()
    role_id: string;
    
    @IsString()
    @Length(1, 52)
    @ApiProperty()
    permission_id: string;

    @IsString()
    @IsName()
    @Length(1, 52)
    @ApiProperty()
    first_name: string;

    @IsString()
    @IsName()
    @Length(1, 52)
    @ApiProperty()
    last_name: string;

    @IsString()
    @IsName()
    @Length(1, 52)
    @ApiProperty()
    username: string;

    @IsEmail()
    @Length(1, 52)
    @ApiProperty()
    email: string;

    @IsNumberString()
    @Length(1, 11)
    @ApiProperty()
    phone_number: string;

    @IsOptional()
    @IsString()
    @Length(1, 10)
    @ApiPropertyOptional()
    gender?: string;

    @IsOptional()
    @IsString()
    @Length(1, 220)
    @ApiPropertyOptional()
    home_address?: string;

    @IsOptional()
    @IsString()
    @Length(1, 220)
    @ApiPropertyOptional()
    state_of_residence?: string;

    @IsOptional()
    @IsString()
    @Length(1, 220)
    @ApiPropertyOptional()
    lga?: string;

    @IsOptional()
    @IsString()
    @Length(1, 220)
    @ApiPropertyOptional()
    geo_political_zone?: string;

    // Institution DETAILS

    @IsString()
    @Length(1, 52)
    @ApiProperty()
    estate_id: string;

}