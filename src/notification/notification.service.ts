import { Injectable } from '@nestjs/common';
import { Notification } from './entity/notification.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private readonly notification: Repository<Notification>
      ) {}


    async getManyView(active:boolean,user:User){
        return await this.notification.find({where:{isActive:active,user}});
    }

    async getManyNew(view:boolean,user:User){
        return await this.notification.find({where:{view:view,isActive:true,user}});
    }

    async getOne(id:number){
        return await this.notification.findOne(id);
    }

    /**
     * Actualizo Notificacion visto
     */
     async editOneView(dto:any) {
        const notifcation = await this.getOne(dto.id);   
        const {id, ...notificationData} = dto;

        const editeNotification = Object.assign(notifcation, notificationData);
        
        return await this.notification.save(editeNotification);
    }

    /**
     * Elimina Notificacion visto
     */
     async activeOneView(dto:any) {
        const notifcation = await this.getOne(dto.id);   
        const editeNotification = Object.assign(dto);
        return await this.notification.save(editeNotification);
    }
}
