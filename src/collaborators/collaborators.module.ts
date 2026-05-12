import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersModule } from '../members/members.module';
import { CollaboratorsService } from './collaborators.service';
import { Collaborator } from './entities/collaborator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collaborator]), MembersModule],
  providers: [CollaboratorsService],
  exports: [CollaboratorsService],
})
export class CollaboratorsModule {}
