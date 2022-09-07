import { Controller,Post, Body, Response, UseGuards, Get, Request, UsePipes,ValidationPipe  } from '@nestjs/common';
import { LoginModel } from 'src/models/login.model';
import { RegisterModel } from 'src/models/register.model'
import { AppService } from 'src/app.service';
import {LocalAuthGuard} from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {

    constructor(
        private readonly appService: AppService,
        private usersService:UsersService,
        private authService:AuthService
    ) {}

    // @UsePipes(new ValidationPipe({ transform: true }))
    @UseGuards(LocalAuthGuard)
    @Post('login/')
    async Login(@Body() LoginModel :LoginModel,@Response() res): Promise<string> {
        return await this.authService.login(LoginModel,res);
    }

    @UsePipes(new ValidationPipe({ transform: true }))
    @Post('register/')
    async register(@Body() registerModel :RegisterModel,@Response() res): Promise<string> {
        return await this.usersService.register(registerModel,res);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
