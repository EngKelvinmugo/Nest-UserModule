export declare class WebhookService {
    private firestore;
    private messagesCollection;
    private rateLimiter;
    constructor();
    handleIncomingMessage(phone: string, message: string): Promise<{
        reply: string;
        status?: undefined;
    } | {
        status: string;
        reply?: undefined;
    }>;
}
