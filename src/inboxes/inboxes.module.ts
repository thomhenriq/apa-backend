import { Module } from '@nestjs/common';
import { InboxesService } from './inboxes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inbox } from './entities/inbox.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inbox])],
  providers: [InboxesService],
  exports: [InboxesService]
})
export class InboxesModule {}
