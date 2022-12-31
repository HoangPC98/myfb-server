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
  FriendShip = 'friend_ships',
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

export enum TypeDateTime {
  Relative = 'get_one',
  DmyHms24 = 'DD-MM-YYYY HH:mm:ss',
  DmyHms12 = 'DD-MM-YYYY HH:mm:ss APM',
  Dmy = 'DD-MM-YYYY',
}
