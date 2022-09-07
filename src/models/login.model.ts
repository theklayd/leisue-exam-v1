import { IsNotEmpty, IsEmail, MinLength, ValidationArguments } from "class-validator";

export class LoginModel {
  @IsNotEmpty() @IsEmail()
  email: string;
  @IsNotEmpty() 
  password :string;
  
}
