import { CreateEnrolmentDto } from './dto/create-enrolment.dto';
import { UpdateEnrolmentDto } from './dto/update-enrolment.dto';
export declare class EnrolmentsService {
    create(createEnrolmentDto: CreateEnrolmentDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEnrolmentDto: UpdateEnrolmentDto): string;
    remove(id: number): string;
}
