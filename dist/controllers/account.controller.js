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
const account_service_1 = require("../services/account.service");
const register_model_1 = require("../models/register.model");
const validation_pipe_1 = require("../pipes/validation.pipe");
const login_model_1 = require("../models/login.model");
let AccountController = class AccountController {
    constructor(appService) {
        this.appService = appService;
    }
    getAccounts(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.appService.findAllAccount();
            return yield res.status(common_1.HttpStatus.OK).send({
                statusCode: 200,
                success: 'OK',
                data: account,
            });
        });
    }
    getAccountById(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.appService.findAccount(id);
            return yield res.status(common_1.HttpStatus.OK).send({
                statusCode: 200,
                success: 'OK',
                data: account,
            });
        });
    }
    register(memberSave, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield delete memberSave.cpassword;
            const result = yield this.appService.register(memberSave);
            if (result.status) {
                yield delete result.data.password;
                return yield res.status(common_1.HttpStatus.CREATED).send({
                    statusCode: 201,
                    success: 'Created',
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
    login(login, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const logins = yield this.appService.login(login);
            if (logins.status) {
                return yield res.status(common_1.HttpStatus.OK).send({
                    statusCode: 200,
                    success: 'OK',
                    accesstoken: logins.data,
                });
            }
            else {
                return yield res.status(common_1.HttpStatus.UNAUTHORIZED).send({
                    statusCode: 401,
                    error: 'Unauthorized',
                    message: logins.error,
                });
            }
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccounts", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountById", null);
__decorate([
    common_1.Post('register'),
    __param(0, common_1.Body(new validation_pipe_1.ValidationPipe())), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_model_1.RegisterModel, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "register", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body(new validation_pipe_1.ValidationPipe())), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_model_1.LogingModel, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "login", null);
AccountController = __decorate([
    common_1.Controller('api/account'),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map