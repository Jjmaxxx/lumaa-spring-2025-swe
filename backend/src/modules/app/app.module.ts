import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '../../config/typeorm.module';
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
