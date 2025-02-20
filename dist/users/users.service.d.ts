import { FirebaseService } from '../firebase/firebase.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private firebaseService;
    private collection;
    constructor(firebaseService: FirebaseService);
    createUser(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
        phone: string;
        id: string;
    }>;
    getUsers(limit?: number, cursor?: string): Promise<{
        users: {
            id: string;
        }[];
        nextCursor: string | null;
    }>;
    getUserById(id: string): Promise<{
        id: string;
    }>;
}
