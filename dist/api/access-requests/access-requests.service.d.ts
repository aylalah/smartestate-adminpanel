import { CreateAccessRequestDto } from './dto/create-access-request.dto';
import { UpdateAccessRequestDto } from './dto/update-access-request.dto';
export declare class AccessRequestsService {
    create(createAccessRequestDto: CreateAccessRequestDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAccessRequestDto: UpdateAccessRequestDto): string;
    remove(id: number): string;
}
