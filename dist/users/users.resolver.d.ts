import { UsersService } from './users.service';
export declare class UsersResolver {
    private usersService;
    constructor(usersService: UsersService);
    users(limit?: number, cursor?: string): Promise<{
        users: {
            id: string;
        }[];
        nextCursor: string | null;
    }>;
}
