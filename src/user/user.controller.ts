import { Body, Controller, Post } from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiTags} from '@nestjs/swagger';
import {Public} from '../decorator/public.decorator';

@Controller()
@ApiBearerAuth()
@ApiTags("User")
export class UserController {
 @Public()
 @Post("/login")
 @ApiBody({
    schema:{
        type:"object"
    }

 })
 async login(@Body() data:any){
      return {message:"You login successfully"}
 }
}
