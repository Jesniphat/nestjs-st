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
const typeorm_1 = require("typeorm");
const tokens_entity_1 = require("./tokens.entity");
let Members = class Members {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Members.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 200 }),
    __metadata("design:type", String)
], Members.prototype, "firstname", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 200 }),
    __metadata("design:type", String)
], Members.prototype, "lastname", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 100 }),
    __metadata("design:type", String)
], Members.prototype, "username", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 100 }),
    __metadata("design:type", String)
], Members.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 500 }),
    __metadata("design:type", String)
], Members.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 100 }),
    __metadata("design:type", String)
], Members.prototype, "position", void 0);
__decorate([
    typeorm_1.Column({ length: 1000, default: '' }),
    __metadata("design:type", String)
], Members.prototype, "image", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 30, default: 1 }),
    __metadata("design:type", Number)
], Members.prototype, "role", void 0);
__decorate([
    typeorm_1.Column('datetime', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", String)
], Members.prototype, "created", void 0);
__decorate([
    typeorm_1.Column('datetime', { default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' }),
    __metadata("design:type", String)
], Members.prototype, "updated", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], Members.prototype, "active", void 0);
__decorate([
    typeorm_1.OneToMany(type => tokens_entity_1.Tokens, tokens => tokens.members),
    __metadata("design:type", Array)
], Members.prototype, "tokens", void 0);
Members = __decorate([
    typeorm_1.Entity()
], Members);
exports.Members = Members;
//# sourceMappingURL=members.entity.js.map