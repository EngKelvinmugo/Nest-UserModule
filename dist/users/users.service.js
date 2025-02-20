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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
let UsersService = class UsersService {
    firebaseService;
    collection = 'users';
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async createUser(createUserDto) {
        const db = this.firebaseService.getDb();
        const existingUser = await db.collection(this.collection).where('email', '==', createUserDto.email).get();
        if (!existingUser.empty) {
            throw new common_1.BadRequestException('Email already in use');
        }
        const docRef = db.collection(this.collection).doc();
        await docRef.set(createUserDto);
        return { id: docRef.id, ...createUserDto };
    }
    async getUsers(limit = 10, cursor) {
        let query = this.firebaseService.getDb().collection(this.collection).orderBy('createdAt').limit(limit);
        if (cursor) {
            const snapshot = await this.firebaseService.getDb().collection(this.collection).doc(cursor).get();
            if (snapshot.exists) {
                query = query.startAfter(snapshot);
            }
        }
        const snapshot = await query.get();
        const users = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        return {
            users,
            nextCursor: lastDoc ? lastDoc.id : null,
        };
    }
    async getUserById(id) {
        const doc = await this.firebaseService.getDb().collection(this.collection).doc(id).get();
        if (!doc.exists)
            throw new common_1.NotFoundException('User not found');
        return { id: doc.id, ...doc.data() };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], UsersService);
//# sourceMappingURL=users.service.js.map