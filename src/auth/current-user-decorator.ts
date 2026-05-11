import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserPayload } from "./jwt.strategy";

// Um decorator exclusivo para pegar o sub do token JWT recebido na requisicao
export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.user as UserPayload
  }
)
