import { IsNotEmpty, Matches } from 'class-validator';
import { IsComparePassword } from '../pipes/validation.pipe';

export class ChangePassword {
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/)
  public old_pass: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/)
  public new_pass: string;

  @IsNotEmpty()
  @IsComparePassword('new_pass')
  public cnew_pass: string;
}