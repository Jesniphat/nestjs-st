import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { verify, generate } from 'password-hash';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { Profile } from '../models/profile.model';
import { Members } from '../entity/members.entity';
import { ProfileResponse, AccountList } from '../interfaces/service.interface';
import { BASE_DIR } from '../main';
import { ChangePassword } from '../models/change-password.model';
import { GetMembersModel } from '../models/get-members.model';
import { Tokens } from '../entity/tokens.entity';

@Injectable()
export class MemberService {
  public constructor(
    @InjectRepository(Members) private readonly memberRepository: Repository<Members>,
    @InjectRepository(Tokens) private readonly tokenRepository: Repository<Tokens>,
  ) {}

  /**
   * Get user list
   * @param limit: number
   * @param total: number
   * @access public
   * @return Promise<ProfileResponse>
   */
  public async onGetUser(query: GetMembersModel): Promise<AccountList> {
    try {
      let limit = {};
      if (query !== null) {
        const start = ( parseInt(query.page, 10) * parseInt(query.limit, 10)) - parseInt(query.limit, 10);
        limit = {
          skip: start,
          take: query.limit,
        };
      }
      const memberLists = await this.memberRepository.find(limit);
      const memberTotal = await this.memberRepository.count();
      const response: AccountList = {
        status: true,
        data: memberLists,
        total: memberTotal,
      };

      return response;
    } catch (e) {
      const error: AccountList = {
        status: false,
        error: e.message,
      };
      return error;
    }
  }

  /**
   * onUpdateProfile
   * @param memberId: number
   * @param body: Profile
   * @access public
   * @return Promise<ProfileResponse>
   */
  public async onUpdateProfile(memberId: number, body: Profile): Promise<ProfileResponse> {
    try {
      let members: Members = new Members();

      members = Object.assign(body);
      members.id = memberId;
      members.image = await this._convertUploadImage(memberId, body.image);

      const profile = await this.memberRepository.save(members);
      profile.image = profile.image ? 'http://localhost:3000' + profile.image : '';
      const responst = {
        status: true,
        data: profile,
      };
      return responst;
    } catch (e) {
      const error = {
        status: false,
        error: e.message,
      };
      return error;
    }
  }

  /**
   * convart base64 to file
   * @param memberId
   * @param image
   * @access private
   * @return file name and path : string
   */
  private async _convertUploadImage(memberId, image: string) {
    try {
      const img = image.split(',');
      const uploadDir = BASE_DIR + '/uploads';
      if (!existsSync(uploadDir)) mkdirSync(uploadDir);

      if (img[0].indexOf('image/jpeg') >= 0) {
        const fileName = `${uploadDir}/${memberId}.jpg`;
        writeFileSync(fileName, img[1], 'base64');
        return fileName.replace(BASE_DIR, '');
      }

      throw new Error('File not jpeg');
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

/**
 * change password
 * @param memberId: number
 * @param body: ChangePassword
 * @access public
 * @return Promise<ProfileResponse>
 */
  public async onChangePassword(memberId: number, body: ChangePassword): Promise<ProfileResponse> {
    try {
      let member: Members = new Members();

      member = await this.memberRepository.findOne(memberId);
      if (!verify(body.old_pass, member.password)) {
        throw new Error('current password not match.');
      }
      member.password = generate(body.new_pass);
      member = await this.memberRepository.save(member);
      const responst = {
        status: true,
        data: member,
      };
      return Object.assign(responst);
    } catch (e) {
      const error = {
        status: false,
        error: e.message,
      };
      return error;
    }
  }

  public async onJoin() {
    try {
      const token = await this.tokenRepository
                          .createQueryBuilder('tokens')
                          .innerJoinAndSelect('tokens.members', 'members')
                          .getOne();
      // tslint:disable-next-line:no-console
      console.log(token);

      const mem = await this.memberRepository
                            .createQueryBuilder('members')
                            .innerJoinAndSelect('members.tokens', 'tokens')
                            // .where('tokens.id = 12')
                            .getOne();
      // tslint:disable-next-line:no-console
      console.log(mem);

      return true;
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e.message);
      return e.message;
    }
  }

}
