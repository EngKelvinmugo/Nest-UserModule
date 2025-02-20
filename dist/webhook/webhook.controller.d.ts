import { FirebaseService } from '../firebase/firebase.service';
import { ConfigService } from '@nestjs/config';
export declare class WebhookController {
    private firebaseService;
    private configService;
    constructor(firebaseService: FirebaseService, configService: ConfigService);
    handleWebhook(authHeader: string, body: any): Promise<{
        reply: string;
        success?: undefined;
    } | {
        success: boolean;
        reply?: undefined;
    }>;
}
