import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UsersModule } from '../users/user.module';
import { VerifyJWT } from '../auth/verify-jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UsersModule,
    AuthModule
  ],
  providers: [TaskRepository, TaskService, VerifyJWT],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
