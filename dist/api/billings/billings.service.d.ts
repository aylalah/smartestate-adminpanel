import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
export declare class BillingsService {
    create(createBillingDto: CreateBillingDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBillingDto: UpdateBillingDto): string;
    remove(id: number): string;
}
