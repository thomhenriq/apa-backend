import { Body, Controller, Post } from '@nestjs/common';
import { CreateMemberDto } from './dtos/create-member.dto';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Post()
  async register(@Body() body: CreateMemberDto) {
    const member = await this.membersService.register(body);

    return member;
  }
}
