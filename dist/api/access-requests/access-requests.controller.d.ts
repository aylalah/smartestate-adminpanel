import { AccessRequestsService } from './access-requests.service';
import { CreateAccessRequestDto } from './dto/create-access-request.dto';
import { UpdateAccessRequestDto } from './dto/update-access-request.dto';
export declare class AccessRequestsController {
    private readonly accessRequestsService;
    constructor(accessRequestsService: AccessRequestsService);
    create(createAccessRequestDto: CreateAccessRequestDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAccessRequestDto: UpdateAccessRequestDto): string;
    remove(id: string): string;
}
