import { Injectable, Response } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterModel } from 'src/models/register.model';
import { LoginModel } from 'src/models/login.model';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne(username);
      if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }

    async login(user: LoginModel, @Response() res): Promise<string> {
        //validateUser function already called on LocalStrategy
        res.set({  }).json({
            access_token : this.jwtService.sign(user)
        });
        return; 
    }
}
