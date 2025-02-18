import { Injectable, ConflictException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;
    const existingUser = await this.userRepository.findUser(username);

    if (existingUser) {
      throw new ConflictException('User with this username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.createUser({
      username,
      email,
      password: hashedPassword,
    });

    return { message: 'User registered', user: newUser };
  }
}