// src/tasks/repositories/task.repository.ts
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findByUserId(userId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { userId } });
  }

  async findById(id: number): Promise<Task | null> {
    return this.taskRepository.findOne({ where: { id } });
  }

}
