import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { InboxesModule } from 'src/inboxes/inboxes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), InboxesModule],
  providers: [MembersService],
  controllers: [MembersController],
  exports: [MembersService],
})
export class MembersModule {}
