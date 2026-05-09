import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { MembersModule } from './members/members.module';
import { InboxesModule } from './inboxes/inboxes.module';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import { TasksModule } from './tasks/tasks.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'apadb.sql',
      autoLoadEntities: true,
      synchronize: true,
    }),
    EventEmitterModule.forRoot(),
    ProjectsModule,
    MembersModule,
    InboxesModule,
    CollaboratorsModule,
    TasksModule,
  ],
})
export class AppModule { }
