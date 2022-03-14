import { Controller, Get, Param, Patch, Body, UseInterceptors } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Auth, User } from 'src/common/decorators';
import {  User as UserEntity } from 'src/user/entity';
import { TransformInterceptor } from 'src/shared/http-response';

@Controller('notification')
@UseInterceptors(TransformInterceptor)
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService,
    ){}

    @Auth()
    @Get('view')
    async getManyView(
      @User() user:UserEntity
    ) {
      
      let category = await this.notificationService.getManyView(true,user);
      return { data: category }
    }

    @Auth()
    @Get('new')
    async getManyNew(
      @User() user:UserEntity
    ) {
      
      let category = await this.notificationService.getManyNew(false,user);
      return { data: category }
    }

    @Auth()
    @Patch(':id')
    async edit(
      @User() user:UserEntity,
      @Body() dto,
      @Param('id') id

    ) {
    
      dto.id=id;
      let category = await this.notificationService.editOneView(dto);
      return { message:'Notificación Actualizada' }
    }

}
