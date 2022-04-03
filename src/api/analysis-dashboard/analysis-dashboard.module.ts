import { Module } from '@nestjs/common';
import { InstitutionsService} from 'src/api/estates/institutions.service';
import { Institution } from 'src/api/estates/entities/estate.entity';
import { User, UserService } from '../user';
import { AnalysisDashboardService } from './analysis-dashboard.service';
import { AnalysisDashboardController } from './analysis-dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesModule } from '../../services';



@Module({
  imports: [TypeOrmModule.forFeature([Institution, User]), ServicesModule],
  controllers: [AnalysisDashboardController],
  providers: [AnalysisDashboardService, InstitutionsService, UserService],
  exports: [AnalysisDashboardService, InstitutionsService, UserService]
})
export class AnalysisDashboardModule {}
