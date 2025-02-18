import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: { username: string; email: string; password: string }) {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findUser(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username },
    });
  }
}
