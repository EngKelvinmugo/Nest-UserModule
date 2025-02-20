import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
        phone: string;
        id: string;
    }>;
    getUsers(limit: number, cursor?: string): Promise<{
        users: {
            id: string;
        }[];
        nextCursor: string | null;
    }>;
    getUser(id: string): Promise<{
        id: string;
    }>;
}
