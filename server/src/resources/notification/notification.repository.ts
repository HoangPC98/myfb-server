import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginSession } from 'src/database/entities/login-session.entity';
import { NotificationReceive } from 'src/database/entities/notification-receive.entity';
import { Notifications } from 'src/database/entities/notification.entity';
import { User } from 'src/database/entities/user.entity';
import { EntityType, NotifyType } from 'src/types/enum-types/common.enum';
import { getManager, Repository } from 'typeorm';

@Injectable()
export class NotificationRepositoty {
  constructor(
    @InjectRepository(LoginSession)
    private readonly loginSessionRepo: Repository<LoginSession>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getFcmToken(user_id: number): Promise<Array<string>> {
    const rec = await this.loginSessionRepo.find({ user_id });
    console.log('rec>>>', user_id, rec);
    return rec.map((item) => item.fcm_token);
  }

  async getUser(user_id: number): Promise<User> {
    return await this.userRepo.findOne({ id: user_id });
  }

  async getEntityRecById(
    entity_type: EntityType,
    entity_id: number,
  ): Promise<any> {
    return await getManager()
      .createQueryBuilder(entity_type, entity_type)
      .where('id = :entity_id', { entity_id })
      .leftJoin('users', 'owner')
      .getOne();
  }

  async saveNotication(
    message: string,
    receiver_uid: number,
    entity_id: number,
    entity_type: EntityType,
    notify_type: NotifyType,
  ): Promise<any> {
    const newNotification = new Notifications();
    newNotification.entity_id = entity_id;
    newNotification.entity_type = entity_type;
    newNotification.notify_type = notify_type;
    newNotification.data = message;
    console.log('recivermdmdmdm', receiver_uid);
    try {
      await getManager().transaction(async (transactionManager) => {
        const created_notify = await transactionManager.save(newNotification);

        const newNotificationReceive = new NotificationReceive();
        newNotificationReceive.notification_id = created_notify.id;
        newNotificationReceive.owner_id = receiver_uid;
        await transactionManager.save(newNotificationReceive);
      });
    } catch (err) {
      console.error('error when save notification', err);
      throw new InternalServerErrorException('error when save notification');
    }
  }
}
