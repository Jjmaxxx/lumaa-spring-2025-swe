import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    const existingUser = await this.userService.findUser(email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.createUser({
      email,
      password: hashedPassword,
    });
    const payload = { email: newUser.email, sub: newUser.id };
    const token = this.jwtService.sign(payload);

    return { message: 'User registered', token };
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findUser(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { message: 'Login successful', token };
  }
}