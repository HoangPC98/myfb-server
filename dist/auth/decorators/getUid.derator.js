"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUID = exports.GetCurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.GetCurrentUser = (0, common_1.createParamDecorator)((_, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user;
});
exports.GetCurrentUID = (0, common_1.createParamDecorator)((_, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.uid;
});
//# sourceMappingURL=getUid.derator.js.map