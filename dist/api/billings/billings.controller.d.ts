import { BillingsService } from './billings.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
export declare class BillingsController {
    private readonly billingsService;
    constructor(billingsService: BillingsService);
    create(createBillingDto: CreateBillingDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBillingDto: UpdateBillingDto): string;
    remove(id: string): string;
}
