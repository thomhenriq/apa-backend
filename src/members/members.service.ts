import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateMemberDto } from './dtos/create-member.dto';
import { Inbox } from '../inboxes/entities/inbox.entity';
import { InboxesService } from '../inboxes/inboxes.service';

@Injectable()
export class MembersService {
    constructor(
        @InjectRepository(Member) private membersRepository: Repository<Member>,
        private inboxService: InboxesService,
        private dataSource: DataSource,
    ) { }

    async register(createMemberDto: CreateMemberDto): Promise<Member> {
        const existing = await this.membersRepository.findOneBy({ email: createMemberDto.email });

        if (existing) {
            throw new ConflictException('Já existe um membro com esse email cadastrado.');
        }

        return this.dataSource.transaction(async (tx) => {

            const member = tx.create(Member, {
                name: createMemberDto.name,
                email: createMemberDto.email,
                role: createMemberDto.role,
            });

            await tx.save(member);

            await this.inboxService.create(member)

            return member;
        });
    }
}
