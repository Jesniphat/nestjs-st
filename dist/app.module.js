"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const passport_1 = require("@nestjs/passport");
const app_controller_1 = require("./controllers/app.controller");
const account_controller_1 = require("./controllers/account.controller");
const account_service_1 = require("./services/account.service");
const db_authen_service_1 = require("./services/db-authen.service");
const jwt_authen_service_1 = require("./services/jwt-authen.service");
const members_entity_1 = require("./entity/members.entity");
const tokens_entity_1 = require("./entity/tokens.entity");
const member_controller_1 = require("./controllers/member.controller");
const member_service_1 = require("./services/member.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([members_entity_1.Members, tokens_entity_1.Tokens]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secretOrPrivateKey: 'Mr.Jesse',
                signOptions: {
                    expiresIn: 3600,
                },
            }),
        ],
        controllers: [
            app_controller_1.AppController,
            account_controller_1.AccountController,
            member_controller_1.MemberControlle,
        ],
        providers: [
            account_service_1.AccountService,
            db_authen_service_1.DBAuthenService,
            db_authen_service_1.DBAuthenStrategy,
            jwt_authen_service_1.JwtAuthenService,
            jwt_authen_service_1.JwtAuthenStrategy,
            member_service_1.MemberService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map