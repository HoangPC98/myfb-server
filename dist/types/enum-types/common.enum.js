"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionType = exports.ReplyAddFrRequest = exports.NotifyType = exports.EntityType = void 0;
var EntityType;
(function (EntityType) {
    EntityType["FriendShip"] = "friend_ships";
    EntityType["Post"] = "posts";
    EntityType["Reaction"] = "reactions";
    EntityType["Photo"] = "photos";
    EntityType["Comment"] = "comments";
})(EntityType = exports.EntityType || (exports.EntityType = {}));
var NotifyType;
(function (NotifyType) {
    NotifyType["AddFriendRequest"] = "add friend request";
    NotifyType["AcceptFriendReq"] = "accept frinend Request";
    NotifyType["HasReact"] = "has comment";
    NotifyType["HasComment"] = "has react";
})(NotifyType = exports.NotifyType || (exports.NotifyType = {}));
var ReplyAddFrRequest;
(function (ReplyAddFrRequest) {
    ReplyAddFrRequest["Accept"] = "accept";
    ReplyAddFrRequest["Reject"] = "reject";
})(ReplyAddFrRequest = exports.ReplyAddFrRequest || (exports.ReplyAddFrRequest = {}));
var ReactionType;
(function (ReactionType) {
    ReactionType["Like"] = "like";
    ReactionType["Love"] = "love";
    ReactionType["Haha"] = "haha";
    ReactionType["Sad"] = "sad";
    ReactionType["Angry"] = "angry";
})(ReactionType = exports.ReactionType || (exports.ReactionType = {}));
//# sourceMappingURL=common.enum.js.map