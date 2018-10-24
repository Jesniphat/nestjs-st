import { IsNotEmpty, IsString } from 'class-validator';

export class Profile {
  @IsNotEmpty()
  @IsString()
  public firstname: string;

  @IsNotEmpty()
  @IsString()
  public lastname: string;

  @IsNotEmpty()
  @IsString()
  public position: string;

  public image: string;
}