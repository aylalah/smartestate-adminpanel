import { CreateInstitutionUserDto } from './create-institution-user.dto';
import { ApiProperty, PartialType, ApiPropertyOptional } from '@nestjs/swagger';
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

export class UpdateInstitutionUserDto extends PartialType(CreateInstitutionUserDto) {

    // Institution DETAILS

    @IsString()
    @Length(1, 52)
    @ApiProperty()
    institution_id: string;
}

export class ResetInstitutionCodeDto {
    @IsString()
    @Length(1, 26)
    @ApiProperty()
    current_password: string;
  
    @IsString()
    @Length(1, 26)
    @ApiProperty()
    new_password: string;
  
    @IsString()
    @Length(1, 26)
    @ApiProperty()
    confirm_new_password: string;
}

export class MessageDto {

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  message?: any;

}
