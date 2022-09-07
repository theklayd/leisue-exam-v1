import { Module,CacheModule  } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    CacheModule.register({ 
      store: redisStore, 
      host : 'localhost',
      port : 49153,
      auth_pass : 'redispw'
    })
  ],
  controllers: [AppController, UsersController],
  providers: [AppService]
})
export class AppModule {}
