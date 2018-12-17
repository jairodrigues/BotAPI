import { Module } from '@nestjs/common';
import { Bot } from './bot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotRepository } from './bot.repository';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';

@Module({
    imports: [TypeOrmModule.forFeature([Bot, BotRepository])],
    providers: [BotService],
    controllers: [BotController],
})
export class BotModule {}
