import { Module } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { InstitutionsController } from './institutions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './entities/estate.entity';
import { ServicesModule } from '../../services';
import { MailService } from '../../mail/mail.service';
import { InstitutionUsersService} from 'src/api/estate-users/institution-users.service';
import { InstitutionUser } from 'src/api/estate-users/entities/institution-user.entity';
import { User, UserService } from '../user';

@Module({
  imports: [TypeOrmModule.forFeature([Institution, InstitutionUser, User]), ServicesModule],
  controllers: [InstitutionsController],
  providers: [InstitutionsService, MailService, InstitutionUsersService, UserService],
  exports: [InstitutionsService, InstitutionUsersService, UserService]
})
export class InstitutionsModule {}
