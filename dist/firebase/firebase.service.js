"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FirebaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
let FirebaseService = FirebaseService_1 = class FirebaseService {
    db;
    logger = new common_1.Logger(FirebaseService_1.name);
    onModuleInit() {
        try {
            const serviceAccountPath = path.join(__dirname, '../../firebase-service-account.json');
            if (!fs.existsSync(serviceAccountPath)) {
                throw new Error(`Firebase credentials file not found at ${serviceAccountPath}`);
            }
            const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
            if (!admin.apps.length) {
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                });
                this.logger.log('Firebase Admin SDK initialized successfully.');
            }
            this.db = admin.firestore();
            this.logger.log('Firestore database connection established.');
        }
        catch (error) {
            this.logger.error('Firebase initialization error:', error);
            throw error;
        }
    }
    getDb() {
        return this.db;
    }
};
exports.FirebaseService = FirebaseService;
exports.FirebaseService = FirebaseService = FirebaseService_1 = __decorate([
    (0, common_1.Injectable)()
], FirebaseService);
//# sourceMappingURL=firebase.service.js.map