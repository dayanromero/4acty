import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entity/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification])
  ],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
