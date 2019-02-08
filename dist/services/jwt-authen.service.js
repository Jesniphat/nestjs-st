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
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const members_entity_1 = require("../entity/members.entity");
let JwtAuthenService = class JwtAuthenService {
    constructor(memberRepository, jwtService) {
        this.memberRepository = memberRepository;
        this.jwtService = jwtService;
    }
    generateAccessToken(memberData) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { id: memberData.id, role: memberData.role, position: memberData.position };
            const token = yield this.jwtService.sign(payload);
            return token;
        });
    }
    validateUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const member = yield this.memberRepository.findOne(data.id);
                if (!member) {
                    throw new Error('Token exprie or token not match or this user is not longer.');
                }
                yield delete member.password;
                return member;
            }
            catch (e) {
                return e.message;
            }
        });
    }
};
JwtAuthenService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(members_entity_1.Members)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], JwtAuthenService);
exports.JwtAuthenService = JwtAuthenService;
let JwtAuthenStrategy = class JwtAuthenStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor(authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'Mr.Jesse',
        });
        this.authService = authService;
    }
    validate(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.validateUser(payload);
            if (!user) {
                throw new common_1.UnauthorizedException('please login.', 'Unauthorized');
            }
            return user;
        });
    }
};
JwtAuthenStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [JwtAuthenService])
], JwtAuthenStrategy);
exports.JwtAuthenStrategy = JwtAuthenStrategy;
//# sourceMappingURL=jwt-authen.service.js.map