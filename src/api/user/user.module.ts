import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { ServicesModule } from '../../services';
import { MailService } from '../../mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ServicesModule],
  controllers: [UserController],
  providers: [UserService, MailService],
  exports: [UserService],
})
export class UserModule {}
