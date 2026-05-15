import { Injectable } from "@nestjs/common";
import { Encrypter } from "../../domain/forum/application/cryptography/encrypter.js";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: JwtService) {}

  encrypt(payload: Record<string, unknown>) {
    return this.jwtService.signAsync(payload)
  }

}
