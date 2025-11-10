import { Service } from 'typedi';
import bcrypt from 'bcrypt';

@Service()
export class PasswordService {
  public readonly BCRYPT_SALT = 10;

  public async encrypt(password: string): Promise<string> {
    return bcrypt.hashSync(password, this.BCRYPT_SALT);
  }

  public async validate(
    password: string,
    encodedPassword: string
  ): Promise<boolean> {
    return bcrypt.compareSync(password, encodedPassword);
  }
}
