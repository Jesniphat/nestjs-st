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
  @Matches(/^[A-z0-9]{6,15}$/)
  password: string;

  @IsNotEmpty()
  @IsComparePassword('password')
  cpassword: string;
}