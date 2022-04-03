import { EnrolmentsService } from './enrolments.service';
import { CreateEnrolmentDto } from './dto/create-enrolment.dto';
import { UpdateEnrolmentDto } from './dto/update-enrolment.dto';
export declare class EnrolmentsController {
    private readonly enrolmentsService;
    constructor(enrolmentsService: EnrolmentsService);
    create(createEnrolmentDto: CreateEnrolmentDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEnrolmentDto: UpdateEnrolmentDto): string;
    remove(id: string): string;
}
