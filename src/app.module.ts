import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from './database/schema/user';
import {ConfigModule} from '@nestjs/config';
import {Balance, BalanceSchema} from './database/schema/balance';
import {Password, PasswordSchema} from './database/schema/password';
import {UserLoginHistory, UserLoginHistorySchema} from './database/schema/userLoginHistory';
import {UserTransactionHistory, UserTransactionHistorySchema} from './database/schema/userTransaction';
import { UserController } from './user/user.controller';
import {AuthGuard} from './guard/auth.guard';
import {JwtModule} from '@nestjs/jwt';
import {APP_GUARD} from '@nestjs/core';
import {LoggerModule} from 'nestjs-pino';
@Module({
    imports: [
    ConfigModule.forRoot({
        isGlobal: true, // Makes the configuration available globally
      }),
      LoggerModule.forRoot({
        pinoHttp:{
            name:'backend',
            transport:{
                target:'pino-pretty',
                options:{
                    singleLine:true
                }
            }
           }
      }),
      JwtModule.register({
        global:true,
        secret: process.env.JWT_SECRET,
        signOptions:{
            expiresIn:'24h'
        }
      }),
    MongooseModule.forRootAsync({
     useFactory:async()=>{
        console.log("process.env.DATABASE_URL",process.env)
       return {
        uri:process.env.DATABASE_URL??""
       }
     }
    }),
    MongooseModule.forFeature([
    {
        name:User.name,
        schema:UserSchema
    },
    {
        name:Balance.name,
        schema:BalanceSchema
    },
    {
        name:Password.name,
        schema:PasswordSchema
    },
    {
        name:UserLoginHistory.name,
        schema:UserLoginHistorySchema
    },
    {
        name:UserTransactionHistory.name,
        schema:UserTransactionHistorySchema
    }
    
])],
  controllers: [AppController, UserController],
  providers: [AppService,
  {
    provide:APP_GUARD,
    useClass:AuthGuard
  }

  ],
})
export class AppModule {}
