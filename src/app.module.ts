import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { MembersModule } from './members/members.module';
import { InboxesModule } from './inboxes/inboxes.module';

@Module({
  imports: [TypeOrmModule.forRoot(({
    type:'sqlite',
    database: "apadb.sql",
    autoLoadEntities: true,
    synchronize: true,
  })), ProjectsModule, MembersModule, InboxesModule],
})
export class AppModule {}
