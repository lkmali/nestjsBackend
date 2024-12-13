import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import { Request,Response } from "express";
import {JwtService} from "@nestjs/jwt"
import {Reflector} from "@nestjs/core";
@Injectable()
export class AuthGuard implements CanActivate {
   constructor(private readonly config: ConfigService,
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ){ }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.get<boolean>('isPublic',context.getHandler())
        if(isPublic){
            return true
        }
        const request = context.switchToHttp().getRequest()
        const token = this.getAuthToken(request)
        if(!token){
            throw new UnauthorizedException()
        }
        try{
            const payload = this.jwtService.verifyAsync(token,{
                secret:this.config.get<string>("JWT_SECRET")
             })
             request['user'] = payload
             return true
        }catch {
            throw new UnauthorizedException(token)
        }
    }
    private getAuthToken(req: Request){
          const [type,token] = req.headers.authorization?.split(" ")??[]
          return type==='Bearer' ?token:undefined
    }   
}