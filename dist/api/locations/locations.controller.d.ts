import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto, StatusDto } from './dto/update-location.dto';
import { User } from '../user';
import { EventEmitter2 } from 'eventemitter2';
export declare class LocationsController {
    private readonly locationsService;
    private readonly eventEmitter;
    constructor(locationsService: LocationsService, eventEmitter: EventEmitter2);
    create(createLocationDto: CreateLocationDto, authUser: User): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    findAll(): Promise<import("./entities/location.entity").Location[]>;
    findOne(id: string): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    update(id: string, location: UpdateLocationDto, authUser: User): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    suspend(id: string, authUser: User, body: StatusDto): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    remove(id: string): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
}
