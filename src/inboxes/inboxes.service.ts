import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollaboratorsService } from '../collaborators/collaborators.service';
import { Member } from '../members/entities/member.entity';
import { TaskCreatedEvent } from '../tasks/events/task-created.event';
import { Inbox } from './entities/inbox.entity';
import { Message } from './entities/message.entity';

@Injectable()
export class InboxesService {
  constructor(
    @InjectRepository(Inbox) private inboxesRepository: Repository<Inbox>,
    @InjectRepository(Message) private messagesRepository: Repository<Message>,

    @Inject(forwardRef(() => CollaboratorsService))
    private collaboratorsService: CollaboratorsService,
  ) {}

  async create(member: Member): Promise<Inbox> {
    const inbox = this.inboxesRepository.create({ member });

    return await this.inboxesRepository.save(inbox);
  }

  @OnEvent('task.created')
  async handleTaskCreatedEvent(event: TaskCreatedEvent): Promise<void> {
    const collaborators = await this.collaboratorsService.findAllByProjectIdWithMemberInbox(event.task.project.id) 

    const messages = collaborators
      .map((c) =>
        this.messagesRepository.create({
          content: `Nova tarefa criada: ${event.task.name}`,
          inbox: c.member.inbox,
        }),
      );

    if (messages.length > 0) {
      await this.messagesRepository.save(messages);
    }
  }
}
