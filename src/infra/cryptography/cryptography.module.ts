import { Module } from "@nestjs/common";

import { JwtEncrypter } from "./jwt-encrypter.js";
import { BcryptHasher } from "./bcrypt-hasher.js";

import { Encrypter } from "../../domain/forum/application/cryptography/encrypter.js";
import { HashComparer } from "../../domain/forum/application/cryptography/hash-comparer.js";
import { HashGenerator } from "../../domain/forum/application/cryptography/hash-generator.js";

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher }
  ],
  exports: [
    Encrypter,
    HashComparer,
    HashGenerator
  ]
})
export class CryptographyModule {}
