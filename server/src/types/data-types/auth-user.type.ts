import { Order } from '../enum-types/common.enum';

export type JwtUserPayload = {
  uid: number;
  email: string;
  first_name: string;
  last_name: string;
  given_name: string;
  uuid: string;
  iat: number;
  avatar_url: string;
};

export type Pagination = {
  page_size: number;
  page_number: number;
  order: Order;
  order_by: string;
};
