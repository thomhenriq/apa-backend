import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>) {}

    async create(project: Project, createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.tasksRepository.create({
            name: createTaskDto.name,
            description: createTaskDto.description,
            priority: createTaskDto.priority,
            project
        })

        // emit event: project.task_created

        return await this.tasksRepository.save(task)
    }
}
