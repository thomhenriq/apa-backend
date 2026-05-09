import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { Repository } from 'typeorm';
import { MembersService } from '../members/members.service';
import { AddCollaboratorsDto } from './dtos/add-collaborators.dto';
import { Project } from '../projects/entities/project.entity';
import { CollaboratorInviteResult } from './interfaces/collaborator-invite-result.interface.ts';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectRepository(Collaborator)
    private collaboratorsRepository: Repository<Collaborator>,
    private membersService: MembersService,
  ) { }

  async findAllByProjectIdWithMemberInbox(projectId: string): Promise<Collaborator[]> {
    const collaborators =
      await this.collaboratorsRepository.find({
        where: {
          project: { id: projectId },
        },
        relations: {
          member: {
            inbox: true
          }
        }
      });

    return collaborators
  }

  async addToProject(
    project: Project,
    addCollaboratorsDto: AddCollaboratorsDto,
  ): Promise<CollaboratorInviteResult[]> {
    const results: CollaboratorInviteResult[] = [];

    for (const email of addCollaboratorsDto.emails) {
      try {
        const member = await this.membersService.findByEmail(email);

        if (!member) {
          results.push({
            email,
            invited: false,
            message: 'Membro não encontrado',
          });
          continue;
        }

        const alreadyCollaborator =
          await this.collaboratorsRepository.findOneBy({
            project: { id: project.id },
            member: { id: member.id },
          });

        if (alreadyCollaborator) {
          results.push({
            email,
            invited: false,
            message: 'Membro já é colaborador deste projeto',
          });
          continue;
        }

        await this.collaboratorsRepository.save({ project, member });

        results.push({
          email,
          invited: true,
          message: 'Membro adicionado com sucesso',
        });
      } catch {
        results.push({
          email,
          invited: false,
          message: 'Erro interno ao adicionar membro',
        });
      }
    }

    return results;
  }
}
