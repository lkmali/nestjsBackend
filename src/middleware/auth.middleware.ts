import {Inject, Injectable, NestMiddleware, UnauthorizedException} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import { Request,Response } from "express";
import {JwtService} from "@nestjs/jwt"
@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(private readonly config: ConfigService,
        private readonly jwtService: JwtService
    ){

    }
    use(req: any,res: Response,next: (error?: Error|any) => void) {

        const token = this.getAuthToken(req)
        if(!token){
            throw new UnauthorizedException("token not found")
        }

        try{
         const payload = this.jwtService.verify(token,{
            secret:this.config.get<string>("JWT_SECRET")
         })
         
         req['user'] = payload
        }catch(error){
            throw new UnauthorizedException("invalid or token expire")
        }

        return next()


      
        
    }
    private getAuthToken(req: Request){
          const [type,token] = req.headers.authorization?.split(" ")??[]
          return type==='Bearer' ?token:undefined
    }


    
}