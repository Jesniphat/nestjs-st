import { IsNotEmpty, IsEmail } from 'class-validator';

export class LogingModel {
  @IsNotEmpty()
  public username: string;

  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;

  public issave: boolean;

}
