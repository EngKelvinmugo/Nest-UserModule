"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const firestore_1 = require("@google-cloud/firestore");
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
let WebhookService = class WebhookService {
    firestore;
    messagesCollection = 'messages';
    rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory({
        points: 5,
        duration: 60,
    });
    constructor() {
        this.firestore = new firestore_1.Firestore();
    }
    async handleIncomingMessage(phone, message) {
        try {
            await this.rateLimiter.consume(phone);
        }
        catch {
            throw new common_1.BadRequestException('Too many requests, please try again later.');
        }
        const newMessage = {
            phone,
            message,
            timestamp: new Date(),
        };
        await this.firestore.collection(this.messagesCollection).add(newMessage);
        if (message.toLowerCase().includes('help')) {
            return { reply: 'Support contact: support@company.com' };
        }
        return { status: 'Message received' };
    }
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], WebhookService);
//# sourceMappingURL=webhook.service.js.map