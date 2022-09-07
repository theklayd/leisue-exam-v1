import { IsNotEmpty, IsEmail, MinLength, ValidationArguments } from "class-validator";

export class RegisterModel {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty() @IsEmail()
  email: string;
  @IsNotEmpty() @MinLength(6,{
    message:(args:ValidationArguments)=>{
        return 'Too short, minimum length is 6 characters.'
    }
  })
  password :string;
  
}
