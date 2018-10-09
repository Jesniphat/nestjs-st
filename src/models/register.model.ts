import { IsString, IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { IsComparePassword } from 'pipes/validation.pipe';

export class RegisterModel {
  @IsNotEmpty()
  @IsString()
  public firstname: string;

  @IsNotEmpty()
  @IsString()
  public lastname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/)
  public password: string;

  @IsNotEmpty()
  @IsComparePassword('password')
  public cpassword: string;
}
