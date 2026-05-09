import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inbox } from './entities/inbox.entity';
import { Message } from './entities/message.entity';
import { InboxesService } from './inboxes.service';
import { CollaboratorsModule } from '../collaborators/collaborators.module';

@Module({
  imports: [TypeOrmModule.forFeature([Inbox, Message]), forwardRef(() => CollaboratorsModule)],
  providers: [InboxesService],
  exports: [InboxesService],
})
export class InboxesModule {}
