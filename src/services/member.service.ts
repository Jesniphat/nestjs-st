import { Injectable } from '@nestjs/common';
import { Profile } from 'models/profile.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Members } from 'entity/members.entity';
import { Repository } from 'typeorm';
import { ProfileResponse } from 'interfaces/service.interface';

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

      const profile = await this.memberRepository.save(members);
      const responst = Object.assign({ status: true, data: profile});
      return responst;
    } catch (e) {
      const error = Object.assign({status: false, error: e.message});
      return error;
    }
  }
}
