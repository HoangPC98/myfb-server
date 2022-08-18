import { ServiceAccount } from 'firebase-admin';
import config from './fb-notification-5e979-firebase-adminsdk-tprmc-14b7064bc8.json';

const firebaseConfig: ServiceAccount = {
  projectId: config.project_id,
  privateKey: config.private_key,
  clientEmail: config.client_email,
};

export default firebaseConfig;
