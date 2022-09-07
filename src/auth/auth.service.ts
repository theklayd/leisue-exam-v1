import { Injectable, Response, Inject, CACHE_MANAGER, Header } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterModel } from 'src/models/register.model';
import { LoginModel } from 'src/models/login.model';
import {Cache} from 'cache-manager';
import { jwtConstants } from 'src/auth/constants';
@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
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
        const accessToken = this.jwtService.sign(user);
        this.setKey(user.email,accessToken);
        res.set().json({accessToken});
        return; 
    }

    async logout(email, @Response() res): Promise<string> {
        const response = this.deleteKey(email);
        res.set().json(response);
        return; 
    }

    async getKey(key:string):Promise<string>{
        return await this.cacheManager.get(key);
    }

    async setKey(key:string, value:string):Promise<string>{
        return await this.cacheManager.set(key,value,{ttl:jwtConstants.ttl}) //ttl seconds
    }

    async deleteKey(key:string):Promise<string>{
        return await this.cacheManager.del(key)
    }
}
