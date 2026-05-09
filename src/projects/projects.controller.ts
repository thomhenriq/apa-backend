import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddCollaboratorsDto } from '../collaborators/dtos/add-collaborators.dto';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectsService } from './projects.service';
import { CreateTaskDto } from '../tasks/dtos/create-task.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  async create(@Body() body: CreateProjectDto) {
    const project = await this.projectsService.create(body);

    return project;
  }

  @Get()
  async findMany() {
    const projects = await this.projectsService.findMany();

    return projects;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const project = await this.projectsService.findById(id);

    return project;
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    const project = await this.projectsService.findBySlug(slug);

    return project;
  }

  @Post(':id/collaborators')
  async addCollaborators(
    @Body() body: AddCollaboratorsDto,
    @Param('id') projectId: string,
  ) {
    return this.projectsService.addCollaborators(projectId, body);
  }

  @Get(':id/collaborators')
  async findCollaborators(@Param('id') projectId: string) {
    return this.projectsService.findCollaborators(projectId);
  }

  @Post(':id/tasks')
  async addTask(@Body() body: CreateTaskDto, @Param('id') projectId: string) {
    return this.projectsService.addTask(projectId, body);
  }

  @Get(':id/tasks')
  async findTasks(@Param('id') projectId: string) {
    return this.projectsService.findTasks(projectId);
  }
}
