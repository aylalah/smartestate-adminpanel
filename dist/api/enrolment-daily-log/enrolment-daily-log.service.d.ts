import { CreateEnrolmentDailyLogDto } from './dto/create-enrolment-daily-log.dto';
import { UpdateEnrolmentDailyLogDto } from './dto/update-enrolment-daily-log.dto';
export declare class EnrolmentDailyLogService {
    create(createEnrolmentDailyLogDto: CreateEnrolmentDailyLogDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEnrolmentDailyLogDto: UpdateEnrolmentDailyLogDto): string;
    remove(id: number): string;
}
