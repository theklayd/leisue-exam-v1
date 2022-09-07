import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable,UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { LoginModel } from 'src/models/login.model';
import { AuthService } from './auth.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService:AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  async validate(payload: any) {
    //check if existing in redis, if not user logged out
    const token = await this.authService.getKey(payload.email); 
    if(!token){
        throw new UnauthorizedException();
    }
    return payload;
  }

}