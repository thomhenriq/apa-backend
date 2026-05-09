import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { InboxesService } from '../inboxes/inboxes.service';
import { CreateMemberDto } from './dtos/create-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member) private membersRepository: Repository<Member>,
    private inboxService: InboxesService,
    private dataSource: DataSource,
  ) {}

  async findByEmail(email: string): Promise<Member | null> {
    const member = await this.membersRepository.findOneBy({ email });

    return member;
  }

  async register(createMemberDto: CreateMemberDto): Promise<Member> {
    const existing = await this.findByEmail(createMemberDto.email);

    if (existing) {
      throw new ConflictException(
        'Já existe um membro com esse email cadastrado.',
      );
    }

    return this.dataSource.transaction(async (tx) => {
      const member = tx.create(Member, {
        name: createMemberDto.name,
        email: createMemberDto.email,
        role: createMemberDto.role,
      });

      await tx.save(member);

      await this.inboxService.create(member);

      return member;
    });
  }
}
