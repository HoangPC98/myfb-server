import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (_: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user;
  },
);

export const GetCurrentUID = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.uid;
  },
);
