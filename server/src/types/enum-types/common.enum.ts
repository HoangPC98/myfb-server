export enum UserInfoType {
  BasicInfo = 'basic_info',
  Profile = 'profile',
  Privacy = 'privacy',
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum EntityType {
  FriendShip = 'friendship',
  Post = 'posts',
  Reaction = 'reactions',
  Photo = 'photos',
  Comment = 'comments',
  User = 'users',
  Profile = 'profiles',
  Privacy = 'privacy',
}

export enum NotifyType {
  AddFriendRequest = 'add friend request',
  AcceptFriendReq = 'accept',
  HasReact = 'has react',
  HasComment = 'has comment',
}

export enum ReplyAddFrRequest {
  Accept = 'accept',
  Reject = 'reject',
}

export enum ReactionType {
  Like = 'like',
  Love = 'love',
  Haha = 'haha',
  Sad = 'sad',
  Angry = 'angry',
}

export enum FileType {
  ProfilePhoto = 'profilephoto',
  Avatar = 'avatar',
  CoverPhoto = 'coverphoto',
  PostPhoto = 'postphoto',
  Other = 'other',
}

export enum QueryOption {
  GetOne = 'get_one',
  GetMany = 'get_many',
  UseRepository = ' repository',
  UseQueryBuilder = 'queryBuilder',
}

export enum AuthType {
  GoogleAuth = 'google_auth',
  UsernamePasswordAuth = 'username_password_auth',
  OtpAuth = 'otp_auth',
  Login = 'login',
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Locked = 'locked',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum OtpType{
  VerifyEmailOrPhone = 'verify_email_phone',
  ForgotPassword = 'forgot_password',
  MfaAuthen = 'mfa_authen',
  WrongOtp = 'wrong_otp',
}

