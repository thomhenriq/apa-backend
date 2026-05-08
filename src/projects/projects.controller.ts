import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private projectsService: ProjectsService) {}

    @Post()
    async create(@Body() body: CreateProjectDto) {
        const project = await this.projectsService.create(body)

        return project
    }

    @Get()
    async findMany() {
        const projects = await this.projectsService.findMany()

        return projects
    }

    @Get(":id")
    async findById(@Param('id') id: string) {
        const project = await this.projectsService.findById(id)

        return project
    }

    @Get(":slug")
    async findBySlug(@Param('slug') slug: string) {
        const project = await this.projectsService.findBySlug(slug)

        return project
    }
}
