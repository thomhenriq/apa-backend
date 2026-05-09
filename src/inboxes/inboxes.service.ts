import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inbox } from './entities/inbox.entity';
import { Repository } from 'typeorm';
import { Member } from '../members/entities/member.entity';

@Injectable()
export class InboxesService {
  constructor(
    @InjectRepository(Inbox) private inboxesRepository: Repository<Inbox>,
  ) {}

  async create(member: Member): Promise<Inbox> {
    const inbox = this.inboxesRepository.create({
      member,
    });

    return await this.inboxesRepository.save(inbox);
  }
}
