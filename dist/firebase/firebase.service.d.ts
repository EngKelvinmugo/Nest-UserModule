import { OnModuleInit } from '@nestjs/common';
export declare class FirebaseService implements OnModuleInit {
    private db;
    private readonly logger;
    onModuleInit(): void;
    getDb(): FirebaseFirestore.Firestore;
}
