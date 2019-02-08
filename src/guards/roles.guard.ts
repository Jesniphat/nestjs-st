import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RoleAccount } from '../interfaces/role.interface';
import { Members } from '../entity/members.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  private roles: string[];
  // constructor(..._roles: string[]) {
  //     this.roles = _roles;
  // }

  // public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  //   // เก็บค่า Request
  //   const request = context.switchToHttp().getRequest() as Request;
  //   const user = request.user as Members;
  //   // ตรวจสอบว่า role ตรงกลับ param ที่set มาจาก controller หรือไม่
  //   const hasRole = () => this.roles.some(role => role === RoleAccount[user.role]);

  //   // ตรวจสอบว่ามี user login เข้ามาหรือไม่ และมี role ใน user หรือไม่ และ role ตรงกลับ param ที่set มาจาก controller หรือไม่
  //   return user && user.role && hasRole();
  // }

  // กรณีใช้ Reflector
  constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest() as Request;
    const user = request.user as Members;
    const hasRole = () => roles.some(role => role === RoleAccount[user.role]);
    return user && user.role && hasRole();
  }

}
