import { Module } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { MembersModule } from '../members/members.module';

@Module({
  imports: [TypeOrmModule.forFeature([Collaborator]), MembersModule],
  providers: [CollaboratorsService],
  exports: [CollaboratorsService],
})
export class CollaboratorsModule {}
