import { HashComparer } from "@/domain/forum/application/cryptography/hash-comparer.js";
import { HashGenerator } from "@/domain/forum/application/cryptography/hash-generator.js";

export class FakeHasher implements HashGenerator, HashComparer {

  async hash(plain: string) {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string) {
    return plain.concat('-hashed') === hash
  }
}
