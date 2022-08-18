export enum EntityType {
  FriendShip = 'friend_ships',
  Post = 'posts',
  Reaction = 'reactions',
  Photo = 'photos',
  Comment = 'comments',
}

export enum NotifyType {
  AddFriendRequest = 'add friend request',
  AcceptFriendReq = 'accept frinend Request',
  HasReact = 'has comment',
  HasComment = 'has react',
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