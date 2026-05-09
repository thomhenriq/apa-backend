import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './entities/task.entity';
import { TaskCreatedEvent } from './events/task-created.event';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(project: Project, createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create({
      name: createTaskDto.name,
      description: createTaskDto.description,
      priority: createTaskDto.priority,
      project,
    });

    await this.tasksRepository.save(task);

    this.eventEmitter.emit('task.created', new TaskCreatedEvent(task));

    return task;
  }
}
