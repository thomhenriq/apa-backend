import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dtos/create-project.dto';
import { slugify } from 'src/helpers/slugify';
import { nanoid } from 'nanoid'

@Injectable()
export class ProjectsService {
    private slugIdSize = 5

    constructor(@InjectRepository(Project) private projectsRepository: Repository<Project>) { }

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        const slug = `${nanoid(this.slugIdSize)}-${slugify(createProjectDto.name)}`

        const createdProject = await this.projectsRepository.save({
            name: createProjectDto.name,
            slug: slug,
            description: createProjectDto.description
        })

        return createdProject
    }

    async findMany(): Promise<Project[]> {
        const projects = await this.projectsRepository.find()

        return projects
    }

    async findById(id: string): Promise<Project | null> {
        const project = await this.projectsRepository.findOneBy({
            id
        })

        return project
    }

    async findBySlug(slug: string): Promise<Project | null> {
        const project = await this.projectsRepository.findOneBy({
            slug
        })

        return project
    }
}
