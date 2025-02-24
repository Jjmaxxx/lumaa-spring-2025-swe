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
    return this.taskRepository.find({ where: { userId } });
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

  async update(userId: number,id: number, updateTaskDto: Partial<TaskDto>) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error('Task not found');
    }
    if (task.userId !== userId) {
      throw new Error('You are not authorized to update this task.');
    }

    await this.taskRepository.update(id, updateTaskDto);
    return this.taskRepository.findOne({ where: { id } });
  }

  async remove(userId: number, id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error('Task not found');
    }
    if (task.userId !== userId) {
      throw new Error('You are not authorized to delete this task.');
    }
    return this.taskRepository.delete(id);
  }
}