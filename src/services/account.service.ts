import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generate, verify } from 'password-hash';

import { Members } from 'entity/members.entity';
import { SavedResponse, LoginResponse } from 'interfaces/service.interface';
import { LogingModel } from 'models/login.model';
import { RegisterModel } from 'models/register.model';
import { DBAuthenService } from './db-authen.service';
import { JwtAuthenService } from './jwt-authen.service';
import { RoleAccount } from 'interfaces/role.interface';

@Injectable()
export class AccountService {
  public constructor(
    // private readonly authenService: DBAuthenService,
    private readonly authenService: JwtAuthenService,
    @InjectRepository(Members) private readonly memnberRepository: Repository<Members>,
  ) {}

/**
 * root check service
 *
 * @access public
 * @return string
 */
  public root(): string {
    return 'Hello World!!';
  }

/**
 * ดึงข้อมูล account ทั้งหมด
 *
 * @access public
 * @returns Promise<Members[]>
 */
  public async findAllAccount(): Promise<Members[]> {
    return await this.memnberRepository.find();
  }

/**
 * ดึงข้อมููล account ด้วย id
 *
 * @param id: number
 * @access public
 * @return Promise<Members>
 */
  public async findAccount(id: number): Promise<Members> {
    const account = await this.memnberRepository.findOne({ id: (id) });
    return account;
  }

/**
 * ดึง และนับขอมูล account ด้วย Email
 *
 * @param email: string
 * @access private
 * @returns Promise<any[]>
 */
  private async findAccountByEmail(email: string): Promise<any[]> {
    const [account, number] = await this.memnberRepository.findAndCount({ email: (email) });
    const data = [account, number];
    return data;
  }

/**
 * ดึง และนับข้อมูล account ด้วย username
 *
 * @param username: string
 * @access private
 * @returns Promise<any[]>
 */
  private async findAccountByUsername(username: string): Promise<any[]> {
    const [account, number] = await this.memnberRepository.findAndCount({ username: (username)});
    const data = [account, number];
    return data;
  }

/**
 * สมัครสมาชิด เพิ่มข้อมูลลง account
 * @param memberSave: Member
 * @access public
 * @return Promise<SavedResponse>
 */
  public async register(memberSave: RegisterModel): Promise<SavedResponse> {
    try {
      let member: Members = new Members();
      member = Object.assign(memberSave);

      const duplicateEmail = await this.findAccountByEmail(member.email);
      if (duplicateEmail[1] > 0) {
        throw new Error('Email alredy exit.');
      }

      const duplcateUsername = await this.findAccountByUsername(member.username);
      if (duplcateUsername[1] > 0) {
        throw new Error('User name alredy exit.');
      }

      if (member.role == null) {
        member.role = RoleAccount[member.position];
      }
      member.password = generate(member.password);
      const savedData = await this.memnberRepository.save(member);

      // tslint:disable-next-line:no-console
      console.log('Cat has been saved -> ' /*, savedData*/);

      const response: SavedResponse = {
        status: true,
        data: savedData,
      };
      return response;
    } catch (e) {
      const error: SavedResponse = {
        status: false,
        error: e.message,
      };
      return error;
    }
  }

/**
 * ตรวจสอบการเข้าสู้ระบบ
 * @param loginData: LogingModel
 * @access public
 * @return Promise<LoginResponse>
 */
  public async login(loginData: LogingModel): Promise<LoginResponse> {
    try {
      const account = await this.findAccountByUsername(loginData.username);

      if (account[1] === 0) {
        throw new Error('User name not exit.');
      }
      const password = verify(loginData.password, account[0][0].password);

      if (!password) {
        throw new Error('Password not correct.');
      }
      const token = await this.authenService.generateAccessToken(account[0][0]);
      const response: LoginResponse = {
        status: true,
        data: token,
      };
      return response;
    } catch (e) {
      const error: LoginResponse = {
        status: false,
        error: e.message,
      };
      return error;
    }
  }
}
