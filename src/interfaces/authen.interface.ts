import { Members } from 'entity/members.entity';

export interface IAuthen {
  /**
   * generateAccessToken
   * @param memberData: Members
   * @return Promise<string>
   */
  generateAccessToken(memberData: Members): Promise<string>;
}