import { IsString, IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { IsComparePassword } from 'pipes/validation.pipe';

export class RegisterModel {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/)
  password: string;

  @IsNotEmpty()
  @IsComparePassword('password')
  cpassword: string;
}