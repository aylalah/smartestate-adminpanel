import { Module } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { InstitutionsController } from './institutions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './entities/estate.entity';
import { ServicesModule } from '../../services';
import { MailService } from '../../mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Institution]), ServicesModule],
  controllers: [InstitutionsController],
  providers: [InstitutionsService, MailService],
  exports: [InstitutionsService]
})
export class InstitutionsModule {}
