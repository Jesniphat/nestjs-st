import { Members } from 'entity/members.entity';

export class SavedResponse {
  public status: boolean;
  public data: Members;
  public error: string;
}