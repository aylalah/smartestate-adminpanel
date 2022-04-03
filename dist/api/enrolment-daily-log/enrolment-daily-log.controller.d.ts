import { EnrolmentDailyLogService } from './enrolment-daily-log.service';
import { CreateEnrolmentDailyLogDto } from './dto/create-enrolment-daily-log.dto';
import { UpdateEnrolmentDailyLogDto } from './dto/update-enrolment-daily-log.dto';
export declare class EnrolmentDailyLogController {
    private readonly enrolmentDailyLogService;
    constructor(enrolmentDailyLogService: EnrolmentDailyLogService);
    create(createEnrolmentDailyLogDto: CreateEnrolmentDailyLogDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEnrolmentDailyLogDto: UpdateEnrolmentDailyLogDto): string;
    remove(id: string): string;
}
