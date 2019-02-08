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
const passport_http_bearer_1 = require("passport-http-bearer");
const passport_1 = require("@nestjs/passport");
const password_hash_1 = require("password-hash");
const tokens_entity_1 = require("../entity/tokens.entity");
const moment = require("moment");
let DBAuthenService = class DBAuthenService {
    constructor(tokenRepository) {
        this.tokenRepository = tokenRepository;
    }
    generateAccessToken(memberData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!memberData) {
                return 'Member data not set.';
            }
            const token = new tokens_entity_1.Tokens();
            token.members = memberData;
            token.access_token = password_hash_1.generate(Math.random().toString());
            token.exprise = moment().add(30, 'minute').format('YYYY-MM-DD h:mm:ss');
            const savedData = yield this.tokenRepository.save(token);
            return savedData.access_token;
        });
    }
    validateUser(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.tokenRepository
                    .createQueryBuilder('tokens')
                    .innerJoinAndSelect('tokens.members', 'members')
                    .where('tokens.access_token = :access_token', { access_token: accessToken })
                    .getOne();
                if (!token) {
                    throw new Error('Token exprie or token not match.');
                }
                if ((moment(token.exprise).format('YYYY-MM-DD h:mm:ss')) > (moment().format('YYYY-MM-DD h:mm:ss'))) {
                    yield delete token.members.password;
                    return token.members;
                }
            }
            catch (e) {
                return e.message;
            }
        });
    }
};
DBAuthenService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(tokens_entity_1.Tokens)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DBAuthenService);
exports.DBAuthenService = DBAuthenService;
let DBAuthenStrategy = class DBAuthenStrategy extends passport_1.PassportStrategy(passport_http_bearer_1.Strategy) {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    validate(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.validateUser(accessToken);
            if (!user) {
                throw new common_1.UnauthorizedException('please login.', 'Unauthorized');
            }
            return user;
        });
    }
};
DBAuthenStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [DBAuthenService])
], DBAuthenStrategy);
exports.DBAuthenStrategy = DBAuthenStrategy;
//# sourceMappingURL=db-authen.service.js.map