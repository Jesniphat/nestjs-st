import { Members } from 'entity/members.entity';

export class SavedResponse {
  status: boolean;
  data: Members;
  error: string;
}