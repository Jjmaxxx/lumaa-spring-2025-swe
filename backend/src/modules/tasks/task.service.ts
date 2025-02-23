import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskDto } from './dto';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Task) private taskRepository: Repository<Task>
  ) {}

  findAll(userId: number) {
    return this.taskRepository.find({ where: { user: { id: userId } } });
  }
  async create(createTaskDto: TaskDto, user: User) {
    const existingUser = await this.userService.findUser(user.email);
    if (!existingUser) {
        throw new Error('User not found');
    }
    const task = this.taskRepository.create({
        ...createTaskDto,
        user: existingUser,
        userId: existingUser.id
    });

    return this.taskRepository.save(task);
  }

  update(id: number, updateTaskDto: Partial<TaskDto>) {
    return this.taskRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.taskRepository.delete(id);
  }
}