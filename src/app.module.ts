import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(({
    type:'sqlite',
    database: "apadb.sql",
    autoLoadEntities: true,
    synchronize: true
  }))],
})
export class AppModule {}
