import { Members } from 'entity/members.entity';

export class SavedResponse {
  public status: boolean;
  public data?: Members;
  public error?: string;
}

export class LoginResponse {
  public status: boolean;
  public data?: any;
  public error?: string;
}

export class ProfileResponse {
  public status: boolean;
  public data?: Members;
  public error?: string;
}

export class AccountList {
  public status: boolean;
  public data?: Members[];
  public error?: string;
  public total?: number;
}
