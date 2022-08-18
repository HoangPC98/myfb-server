import { Injectable, Logger } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationRepositoty } from './notification.repository';
import * as fcm_admin from 'firebase-admin';
import { EntityType, NotifyType } from 'src/types/enum-types/common.enum';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepositoty,
  ) {}

  private readonly logger = new Logger(NotificationService.name);

  async sendNotificationFromOneToOne(
    sender_uid: number,
    receiver_uid: number,
    entity_id: number,
    notify_type: NotifyType,
    entity_type: EntityType,
    message?: string,
  ) {
    // get receiver_fcmtoken
    const receiver_fcm_tokens = await this.notificationRepository.getFcmToken(
      receiver_uid,
    );

    console.log('tokens receiver', receiver_uid);

    // get SenderName

    const sender = await this.notificationRepository.getUser(sender_uid);
    const sender_name = sender.given_name;
    console.log(sender_name);

    if (message) {
      message = message.replace('$username', sender_name);
    }

    if (message === undefined)
      message = this.composeMessage(sender_name, notify_type, entity_type);
    console.log('notification msg', message);

    // save to DB
    await this.notificationRepository.saveNotication(
      message,
      receiver_uid,
      entity_id,
      entity_type,
      notify_type,
    );

    const redirectObject = {
      entity_id: entity_id,
      entity_type: entity_type,
    };

    const pushNotifyObject = {
      tokens: receiver_fcm_tokens,
      data: {
        message: message,
        redirect: JSON.stringify(redirectObject),
        timestamp: String(Date.now()),
      },
    };
    await this.pushNotifyToMultiDevices(pushNotifyObject);
  }

  private composeMessage(
    from_username: string,
    notify_type: NotifyType,
    entity_type: EntityType,
  ) {
    let message = '';

    switch (notify_type) {
      case NotifyType.AddFriendRequest:
        message = `You have received  ${notify_type} from ${from_username}`;
        break;
      case NotifyType.AcceptFriendReq:
        message = `${from_username} has ${notify_type} your friend request`;
        break;
      case NotifyType.HasComment:
        message =
          entity_type === EntityType.Comment
            ? `${from_username} has reply your ${entity_type}`
            : `${from_username} ${notify_type} your ${entity_type}`;
        break;
    }
    return message;
  }

  private async pushNotifyToMultiDevices(
    pushData: fcm_admin.messaging.MulticastMessage,
  ) {
    try {
      const result = await fcm_admin.messaging().sendMulticast(pushData);
      this.logger.log(
        `push notification <multicast> count success: ${result.successCount} -- failure: ${result.failureCount}`,
      );
      console.log(`list Push ` + pushData.webpush);

      return result;
    } catch (error) {
      this.logger.error(
        `push notification <multicast> with message fail: ${error.message}`,
      );
    }
  }
}
