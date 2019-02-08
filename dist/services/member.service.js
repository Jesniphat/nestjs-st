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
const fs_1 = require("fs");
const members_entity_1 = require("../entity/members.entity");
const main_1 = require("../main");
const tokens_entity_1 = require("../entity/tokens.entity");
let MemberService = class MemberService {
    constructor(memberRepository, tokenRepository) {
        this.memberRepository = memberRepository;
        this.tokenRepository = tokenRepository;
    }
    onGetUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let limit = {};
                if (query !== null) {
                    const start = (parseInt(query.page, 10) * parseInt(query.limit, 10)) - parseInt(query.limit, 10);
                    limit = {
                        skip: start,
                        take: query.limit,
                    };
                }
                const memberLists = yield this.memberRepository.find(limit);
                const memberTotal = yield this.memberRepository.count();
                const response = {
                    status: true,
                    data: memberLists,
                    total: memberTotal,
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
    onUpdateProfile(memberId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let members = new members_entity_1.Members();
                members = Object.assign(body);
                members.id = memberId;
                members.image = yield this._convertUploadImage(memberId, body.image);
                const profile = yield this.memberRepository.save(members);
                profile.image = profile.image ? 'http://localhost:3000' + profile.image : '';
                const responst = {
                    status: true,
                    data: profile,
                };
                return responst;
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
    _convertUploadImage(memberId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const img = image.split(',');
                const uploadDir = main_1.BASE_DIR + '/uploads';
                if (!fs_1.existsSync(uploadDir))
                    fs_1.mkdirSync(uploadDir);
                if (img[0].indexOf('image/jpeg') >= 0) {
                    const fileName = `${uploadDir}/${memberId}.jpg`;
                    fs_1.writeFileSync(fileName, img[1], 'base64');
                    return fileName.replace(main_1.BASE_DIR, '');
                }
                throw new Error('File not jpeg');
            }
            catch (e) {
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    onChangePassword(memberId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let member = new members_entity_1.Members();
                member = yield this.memberRepository.findOne(memberId);
                if (!password_hash_1.verify(body.old_pass, member.password)) {
                    throw new Error('current password not match.');
                }
                member.password = password_hash_1.generate(body.new_pass);
                member = yield this.memberRepository.save(member);
                const responst = {
                    status: true,
                    data: member,
                };
                return Object.assign(responst);
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
    onJoin() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.tokenRepository
                    .createQueryBuilder('tokens')
                    .innerJoinAndSelect('tokens.members', 'members')
                    .getOne();
                console.log(token);
                const mem = yield this.memberRepository
                    .createQueryBuilder('members')
                    .innerJoinAndSelect('members.tokens', 'tokens')
                    .getOne();
                console.log(mem);
                return true;
            }
            catch (e) {
                console.log(e.message);
                return e.message;
            }
        });
    }
};
MemberService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(members_entity_1.Members)),
    __param(1, typeorm_1.InjectRepository(tokens_entity_1.Tokens)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MemberService);
exports.MemberService = MemberService;
//# sourceMappingURL=member.service.js.map