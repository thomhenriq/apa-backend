import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dtos/create-project.dto';
import { slugify } from '../helpers/slugify';
import { nanoid } from 'nanoid';
import { AddCollaboratorsDto } from '../collaborators/dtos/add-collaborators.dto';
import { CollaboratorsService } from '../collaborators/collaborators.service';
import { CollaboratorInviteResult } from '../collaborators/interfaces/collaborator-invite-result.interface.ts';

@Injectable()
export class ProjectsService {
  private slugIdSize = 5;

  constructor(
    @InjectRepository(Project) private projectsRepository: Repository<Project>,
    private collaboratorsService: CollaboratorsService,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const slug = `${nanoid(this.slugIdSize)}-${slugify(createProjectDto.name)}`;

    const createdProject = await this.projectsRepository.save({
      name: createProjectDto.name,
      slug: slug,
      description: createProjectDto.description,
    });

    return createdProject;
  }

  async findMany(): Promise<Project[]> {
    const projects = await this.projectsRepository.find();

    return projects;
  }

  async findById(id: string): Promise<Project | null> {
    const project = await this.projectsRepository.findOneBy({ id });

    return project;
  }

  async findBySlug(slug: string): Promise<Project | null> {
    const project = await this.projectsRepository.findOneBy({ slug });

    return project;
  }

  async addCollaborators(
    projectId: string,
    addCollaboratorsDto: AddCollaboratorsDto,
  ): Promise<CollaboratorInviteResult[]> {
    const project = await this.findById(projectId);

    if (!project) {
      throw new NotFoundException('O projeto não existe');
    }

    return this.collaboratorsService.addToProject(project, addCollaboratorsDto);
  }
}
