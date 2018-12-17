import { Repository, EntityRepository } from 'typeorm';
import { Bot } from './bot.entity';

@EntityRepository(Bot)
export class BotRepository extends Repository<Bot> {
    async newBot(bot: Bot) {
        return await this.insert(bot);
    }

    async getBots() {
        return await this.find();
    }

    async getBotById(id: any) {
        return await this.findOne(id);
    }

    async deleteBot(id: any) {
        return await this.delete(id);
    }

    async updateBot(id: any, bot: Bot) {
        return await this.update(id, bot);
    }
}
