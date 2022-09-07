import { Injectable,Response} from '@nestjs/common';
import { LoginModel } from './models/login.model';
import { RegisterModel } from './models/register.model';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  register(Register:RegisterModel,@Response() Response): string{
    return  Response.set({  }).json(RegisterModel);
  }
}
