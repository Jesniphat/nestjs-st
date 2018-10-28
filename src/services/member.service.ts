import { Injectable, BadRequestException } from '@nestjs/common';
import { Profile } from 'models/profile.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Members } from 'entity/members.entity';
import { Repository } from 'typeorm';
import { ProfileResponse } from 'interfaces/service.interface';
import { BASE_DIR } from 'main';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { ChangePassword } from 'models/change-password.model';
import { verify, generate } from 'password-hash';

@Injectable()
export class MemberService {
  public constructor(
    @InjectRepository(Members) private readonly memberRepository: Repository<Members>,
  ) {}

  /**
   * onUpdateProfile
   * @param memberId: number
   * @param body: Profile
   * @access public
   * @return Promise<Profile>
   */
  public async onUpdateProfile(memberId: number, body: Profile): Promise<ProfileResponse> {
    try {
      let members: Members = new Members();

      members = Object.assign(body);
      members.id = memberId;
      members.image = await this._convertUploadImage(memberId, body.image);

      const profile = await this.memberRepository.save(members);
      profile.image = profile.image ? 'http://localhost:3000' + profile.image : '';
      const responst = Object.assign({ status: true, data: profile});
      return responst;
    } catch (e) {
      const error = Object.assign({status: false, error: e.message});
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
      const responst = Object.assign({ status: true, data: member});
      return Object.assign(responst);
    } catch (e) {
      const error = Object.assign({status: false, error: e.message});
      return error;
    }
  }

}