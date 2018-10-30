import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleAccount } from 'interfaces/role.interface';
import { Members } from 'entity/members.entity';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  private roles: string[];
    constructor(..._roles: string[]) {
        this.roles = _roles;
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      // เก็บค่า Request
      const request = context.switchToHttp().getRequest() as Request;

      // ตรวจสอบว่ามี user login เข้ามาหรือไม่
      if (request.user) {
        const userLogin = request.user as Members;

        // ค้นหาว่า User login มี Role ตรงกับที่ กำหนดมาหรือป่าว
        const searchRoles = this.roles.filter(role => role === RoleAccount[userLogin.role]);
        return searchRoles.length > 0;
      }
      return false;
    }
}
