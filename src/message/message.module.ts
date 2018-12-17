import { Module } from '@nestjs/common';
import { Message } from './message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './message.repository';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
    imports: [TypeOrmModule.forFeature([Message, MessageRepository])],
    providers: [MessageService],
    controllers: [MessageController],
})
export class MessageModule {}
