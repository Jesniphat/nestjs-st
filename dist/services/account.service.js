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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const password_hash_1 = require("password-hash");
const members_entity_1 = require("../entity/members.entity");
const jwt_authen_service_1 = require("./jwt-authen.service");
const role_interface_1 = require("../interfaces/role.interface");
let AccountService = class AccountService {
    constructor(authenService, memnberRepository) {
        this.authenService = authenService;
        this.memnberRepository = memnberRepository;
    }
    root() {
        return 'Hello World!!';
    }
    findAllAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.memnberRepository.find();
        });
    }
    findAccount(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.memnberRepository.findOne({ id: (id) });
            return account;
        });
    }
    findAccountByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [account, number] = yield this.memnberRepository.findAndCount({ email: (email) });
            const data = [account, number];
            return data;
        });
    }
    findAccountByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const [account, number] = yield this.memnberRepository.findAndCount({ username: (username) });
            const data = [account, number];
            return data;
        });
    }
    register(memberSave) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let member = new members_entity_1.Members();
                member = Object.assign(memberSave);
                const duplicateEmail = yield this.findAccountByEmail(member.email);
                if (duplicateEmail[1] > 0) {
                    throw new Error('Email alredy exit.');
                }
                const duplcateUsername = yield this.findAccountByUsername(member.username);
                if (duplcateUsername[1] > 0) {
                    throw new Error('User name alredy exit.');
                }
                if (member.role == null) {
                    member.role = role_interface_1.RoleAccount[member.position];
                }
                member.password = password_hash_1.generate(member.password);
                const savedData = yield this.memnberRepository.save(member);
                console.log('Cat has been saved -> ');
                const response = {
                    status: true,
                    data: savedData,
                };
                return response;
            }
            catch (e) {
                const error = {
                    status: false,
                    error: e.message,
                };
                return error;
            }
        });
    }
    login(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield this.findAccountByUsername(loginData.username);
                if (account[1] === 0) {
                    throw new Error('User name not exit.');
                }
                const password = password_hash_1.verify(loginData.password, account[0][0].password);
                if (!password) {
                    throw new Error('Password not correct.');
                }
                const token = yield this.authenService.generateAccessToken(account[0][0]);
                const response = {
                    status: true,
                    data: token,
                };
                return response;
            }
            catch (e) {
                const error = {
                    status: false,
                    error: e.message,
                };
                return error;
            }
        });
    }
};
AccountService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(members_entity_1.Members)),
    __metadata("design:paramtypes", [jwt_authen_service_1.JwtAuthenService,
        typeorm_2.Repository])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map