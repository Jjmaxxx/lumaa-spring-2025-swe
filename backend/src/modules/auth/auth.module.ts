import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { VerifyJWT } from './verify-jwt';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/user.module';
import { UserService } from '../users/user.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'randomSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,UserService, VerifyJWT],
  exports: [AuthService,VerifyJWT,JwtModule],
})
export class AuthModule {}