import { Controller, UseInterceptors, Post, Body, Get } from '@nestjs/common';
import { TransformInterceptor } from '../shared/http-response';
import { CreateUserBodyDto } from './dto';
import { UserBodyService } from './user-body.service';
import { Auth,User } from 'src/common/decorators';
import {  User as UserEntity } from 'src/user/entity';

@Controller('/user-body')
@UseInterceptors(TransformInterceptor)
export class UserBodyController {
    constructor( private readonly userBodyService: UserBodyService){
        
    }
    @Post()
    @Auth()
  async createOne(
    @Body() dto:CreateUserBodyDto,
    @User() user:UserEntity
  ) {    
        const data = await this.userBodyService.createOne(user,dto);
        return { message: 'Perimetros Musculares Creados', data }
  }

  @Get()
    @Auth()
  async getOneSession(
    @User() user:UserEntity
  ) {    
        const data = await this.userBodyService.findOneSetings(user);
        return { message: 'Perimetros Musculares', data }
  }
}
