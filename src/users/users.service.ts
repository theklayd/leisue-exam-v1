import { Injectable, Response } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ProfileModel } from 'src/models/profile.model';
import { RegisterModel } from 'src/models/register.model';

// This should be a real class/interface representing a user entity
export type Users = any;

@Injectable()
export class UsersService {

  private users:ProfileModel[] = [
    {
      userId: '1',
      firstName : 'john',
      lastName : 'doe',
      email: 'john@gmail.com',
      password: 'changeme',
    },
    {
      userId: '2',
      firstName : 'maria',
      lastName : 'jane',
      email: 'maria@gmail.com',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<Users | undefined> {
    return this.users.find(user => user.email === email);
  }

  async register(payload: RegisterModel, @Response() res): Promise<string> {
    this.users.push({
      userId: randomUUID(), //for demo only
      firstName : payload.firstName,
      lastName : payload.lastName,
      email: payload.email,
      password: payload.password
    });
    console.table(this.users)
    return  res.set({  }).json(
      payload
    );
    // return this.users.find(user => user.email === email);
  }
}