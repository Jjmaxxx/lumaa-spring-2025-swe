import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '../../config/typeorm.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/user.module';
import { TaskModule } from '../tasks/task.module';

@Module({
  imports: [TypeOrmModule,AuthModule,UsersModule,TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
