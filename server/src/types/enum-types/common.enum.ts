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

export enum QueryOption {
  GetOne = 'get_one',
  GetMany = 'get_many',
  UseRepository = ' repository',
  UseQueryBuilder = 'queryBuilder',
}
