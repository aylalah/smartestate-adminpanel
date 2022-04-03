import { Module } from '@nestjs/common';
import { InstitutionUsersService } from './institution-users.service';
import { InstitutionUsersController } from './institution-users.controller';
import { InstitutionsService} from 'src/api/estates/institutions.service';
import { Institution } from 'src/api/estates/entities/estate.entity';
import { InstitutionUser } from 'src/api/estate-users/entities/institution-user.entity';
import { User, UserService } from '../user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesModule } from '../../services';
import { MailService } from '../../mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([InstitutionUser, Institution, User]), ServicesModule],
  controllers: [InstitutionUsersController],
  providers: [InstitutionUsersService, InstitutionsService, UserService, MailService],
  exports: [InstitutionUsersService, InstitutionsService, UserService]
})
export class InstitutionUsersModule {}
