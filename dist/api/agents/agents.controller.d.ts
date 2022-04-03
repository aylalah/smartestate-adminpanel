import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { User, UserService } from '../user';
import { InstitutionsService } from 'src/api/estates/institutions.service';
import { EventEmitter2 } from 'eventemitter2';
import { MailService } from '../../mail/mail.service';
export declare class AgentsController {
    private readonly agentsService;
    private readonly userService;
    private readonly institutionsService;
    private readonly eventEmitter;
    private readonly mailService;
    constructor(agentsService: AgentsService, userService: UserService, institutionsService: InstitutionsService, eventEmitter: EventEmitter2, mailService: MailService);
    create(createAgentDto: CreateAgentDto, authUser: User): Promise<Error | {
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    search(query?: string, perPage?: number): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    findAll(page?: number, perPage?: number, query?: string, from?: string, to?: string): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    findOne(id: string): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    update(id: string, user: UpdateAgentDto): Promise<{
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
    usersMgntDashboard(): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
}
