import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { InsertResult, DeleteResult, UpdateResult } from 'typeorm';
import { BotRepository } from './bot.repository';
import { BotDTO } from './bot.dto';
import { Bot } from './bot.entity';

@Injectable()
export class BotService {
    constructor(
        @InjectRepository(BotRepository)
        private readonly botRepository: BotRepository,
    ) {}

    async getBots(): Promise<BotDTO[]> {
        const bots = await this.botRepository.getBots();
        const response: Array<BotDTO> = [];
        bots.map(bot => {
            response.push({ id: bot.id, name: bot.name });
        });
        return response;
    }

    async updateBot(id: any, botDTO: BotDTO): Promise<UpdateResult> {
        const _bot = new Bot();
        _bot.name = botDTO.name;
        const response = await this.botRepository.updateBot(id, _bot);
        if (!response) throw 'usuário não encontrado';
        return response;
    }

    async getBotById(id: any): Promise<BotDTO> {
        const response = await this.botRepository.getBotById(id);
        if (!response) throw new Error('usuário não encontrado');
        const _bot = new BotDTO();
        _bot.id = response.id;
        _bot.name = response.name;
        return _bot;
    }

    async createBot(botDTO: BotDTO): Promise<InsertResult> {
        const _bot = new Bot();
        _bot.name = botDTO.name;
        return await this.botRepository.newBot(_bot);
    }

    async deleteBot(id: any): Promise<DeleteResult> {
        const response = await this.botRepository.deleteBot(id);
        if (!response) throw new Error('usuário não encontrado');
        return response;
    }
}
