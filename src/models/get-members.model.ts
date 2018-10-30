import { IsNotEmpty } from 'class-validator';

export class GetMembersModel {
  public filter?: string;

  @IsNotEmpty()
  public limit: string;

  @IsNotEmpty()
  public page: string;
}