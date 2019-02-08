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
const profile_model_1 = require("../models/profile.model");
const validation_pipe_1 = require("../pipes/validation.pipe");
const member_service_1 = require("../services/member.service");
const change_password_model_1 = require("../models/change-password.model");
const get_members_model_1 = require("../models/get-members.model");
const roles_guard_1 = require("../guards/roles.guard");
let MemberControlle = class MemberControlle {
    constructor(memberService) {
        this.memberService = memberService;
    }
    getUserList(query, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.memberService.onGetUser(query);
            if (result.status) {
                return yield res.status(common_1.HttpStatus.OK).send({
                    statusCode: 200,
                    success: 'OK',
                    total: result.total,
                    data: result.data,
                });
            }
            else {
                return yield res.status(common_1.HttpStatus.BAD_REQUEST).send({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: result.error,
                });
            }
        });
    }
    userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof req.user === 'object') {
                req.user.image = req.user.image ? 'http://localhost:3000' + req.user.image : '';
                return yield res.status(common_1.HttpStatus.OK).send({
                    statusCode: 200,
                    success: 'OK',
                    data: req.user,
                });
            }
            else {
                return yield res.status(common_1.HttpStatus.UNAUTHORIZED).send({
                    statusCode: 401,
                    error: 'UNAUTHORIZED',
                    messages: req.user,
                });
            }
        });
    }
    updateProfile(req, body, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.memberService.onUpdateProfile(req.user.id, body);
            if (result.status) {
                yield delete result.data.password;
                return yield res.status(common_1.HttpStatus.OK).send({
                    statusCode: 200,
                    success: 'OK',
                    data: result.data,
                });
            }
            else {
                return yield res.status(common_1.HttpStatus.BAD_REQUEST).send({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: result.error,
                });
            }
        });
    }
    changePassword(req, body, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.memberService.onChangePassword(req.user.id, body);
            if (result.status) {
                yield delete result.data.password;
                return yield res.status(common_1.HttpStatus.OK).send({
                    statusCode: 200,
                    success: 'OK',
                    data: result.data,
                });
            }
            else {
                return yield res.status(common_1.HttpStatus.BAD_REQUEST).send({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: result.error,
                });
            }
        });
    }
    selectJoin(res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('join');
            this.memberService.onJoin();
            return yield res.status(common_1.HttpStatus.OK).send({
                statusCode: 200,
                success: 'OK',
            });
        });
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(new roles_guard_1.RolesGuard('admin', 'employee')),
    __param(0, common_1.Query(new validation_pipe_1.ValidationPipe())), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_members_model_1.GetMembersModel, Object]),
    __metadata("design:returntype", Promise)
], MemberControlle.prototype, "getUserList", null);
__decorate([
    common_1.Get('data'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MemberControlle.prototype, "userLogin", null);
__decorate([
    common_1.Put('profile'),
    __param(0, common_1.Req()), __param(1, common_1.Body(new validation_pipe_1.ValidationPipe())), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_model_1.Profile, Object]),
    __metadata("design:returntype", Promise)
], MemberControlle.prototype, "updateProfile", null);
__decorate([
    common_1.Put('change-password'),
    __param(0, common_1.Req()), __param(1, common_1.Body(new validation_pipe_1.ValidationPipe())), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_model_1.ChangePassword, Object]),
    __metadata("design:returntype", Promise)
], MemberControlle.prototype, "changePassword", null);
__decorate([
    common_1.Get('join'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MemberControlle.prototype, "selectJoin", null);
MemberControlle = __decorate([
    common_1.Controller('api/member'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __metadata("design:paramtypes", [member_service_1.MemberService])
], MemberControlle);
exports.MemberControlle = MemberControlle;
//# sourceMappingURL=member.controller.js.map