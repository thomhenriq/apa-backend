import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [TypeOrmModule.forRoot(({
    type:'sqlite',
    database: "apadb.sql",
    autoLoadEntities: true,
    synchronize: true
  })), ProjectsModule],
})
export class AppModule {}
