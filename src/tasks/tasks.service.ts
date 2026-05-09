import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Project } from '../projects/entities/project.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TaskCreatedEvent } from './events/task-created.event';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>, private eventEmitter: EventEmitter2) { }

    async create(project: Project, createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.tasksRepository.create({
            name: createTaskDto.name,
            description: createTaskDto.description,
            priority: createTaskDto.priority,
            project
        })

        await this.tasksRepository.save(task)

        this.eventEmitter.emit("task.created", new TaskCreatedEvent(task))

        return task
    }
}
