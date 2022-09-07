import { 
    Controller,
    Post, 
    Body, 
    Response, 
    UseGuards, 
    Get, 
    Request, 
    UsePipes,
    ValidationPipe  } from '@nestjs/common';
import { LoginModel } from 'src/models/login.model';
import { RegisterModel } from 'src/models/register.model'
import {LocalAuthGuard} from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {

    constructor(
        private usersService:UsersService,
        private authService:AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login/')
    async Login(@Body() LoginModel :LoginModel,@Response() res): Promise<string> {
        return await this.authService.login(LoginModel,res);
    }

    // When our POST /logout route is hit, 
    // the Guard will automatically invoke our passport-jwt custom configured logic, 
    // validating the JWT, and assigning the user property to the Request object.
    @UseGuards(JwtAuthGuard)
    @Post('logout/')
    async Logout(@Request() req, @Response() res): Promise<string> {
        return await this.authService.logout(req.user.email, res);
    }

    @UsePipes(new ValidationPipe({ transform: true }))
    @Post('register/')
    async register(@Body() registerModel :RegisterModel,@Response() res): Promise<string> {
        return await this.usersService.register(registerModel,res);
    }

    // for auth token test
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
